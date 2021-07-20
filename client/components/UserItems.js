import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import UserItemsQuery from "../../server/graphql/queries/UserItemsQuery.graphql";
import { Button, ButtonGroup } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MoneyLineChart from "./MoneyLineChart";
import MoneyBarChart from "./MoneyBarChart";

import EnhancedTable from "./ItemDataGrid";
import TotalDollarUsage from "./TotalDollarUsage";


const UserItems = (props) => {
  const [userItems, setUserItems] = useState([]);
  const [startDate, changeStartDate] = useState("2020-01-01");
  const [endDate, changeEndDate] = useState("2021-08-01");
  const [monthRange, setMonthRange] = useState([]);
  const [chartFilter, setChartFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const { data } = useQuery(UserItemsQuery, {
    variables: {
      id: +localStorage.getItem("user-id"),
    },
    onCompleted: () => setUserItems(data.user.containerItems),
  });

  const getDaysArray = (s, e) => {
    for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
    return a;
  };

  const filterChart = (e) => {
    e.preventDefault();
    setChartFilter(e.currentTarget.value);
  };

  const filterItems = (itemArr) => {
    const newArr = itemArr.filter((item) =>
      monthRange.includes(new Date(item.createdAt).toISOString().substr(0, 7))
    );
    if (chartFilter === "EXPIRED") {
      return newArr.filter((item) => item.itemStatus.includes("EXPIRED"));
    } else if (chartFilter === "ACTIVE") {
      return newArr.filter((item) => item.itemStatus === "ACTIVE");
    } else if (chartFilter === "") {
      return newArr.filter((item) => item.itemStatus !== "REMOVED");
    }
  };

  useEffect(() => {
    const daylist = getDaysArray(new Date(startDate), new Date(endDate));
    const final = daylist.map((v) => v.toISOString().slice(0, 7));
    setMonthRange(final.filter((v, i, a) => a.indexOf(v) === i));
    let items = filterItems(userItems);
    setFilteredItems(items);
  }, [startDate, endDate, userItems, chartFilter]);

  return (
    <div className='stats'>
      <h2>How much food are you using?</h2>

      <ButtonGroup>
        <Button value="" onClick={(e) => filterChart(e)}>
          All
        </Button>
        <Button value="EXPIRED" onClick={(e) => filterChart(e)}>
          Expired
        </Button>
        <Button value="ACTIVE" onClick={(e) => filterChart(e)}>
          Active
        </Button>
      </ButtonGroup>
      <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="inline"
          openTo="year"
          views={["year", "month"]}
          label="Year and Month"
          helperText="Start from year selection"
          value={startDate}
          onChange={changeStartDate}
        />
        <DatePicker
          variant="inline"
          openTo="year"
          views={["year", "month"]}
          label="Year and Month"
          helperText="Start from year selection"
          value={endDate}
          onChange={changeEndDate}
        />
      </MuiPickersUtilsProvider>
      </div>
      <TotalDollarUsage items={filteredItems} />
      <MoneyBarChart items={filteredItems} months={monthRange} />
      {' '}
      <MoneyLineChart items={filteredItems} months={monthRange} />
      
      <EnhancedTable items={filteredItems} />
    </div>
  );
};

export default UserItems;
