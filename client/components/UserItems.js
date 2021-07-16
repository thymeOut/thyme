import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UserItemsQuery from "../../server/graphql/queries/UserItemsQuery.graphql";
import { Button, ButtonGroup } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MoneyLineChart from "./MoneyLineChart";
import EnhancedTable from "./ItemDataGrid";
import TotalDollarUsage from './TotalDollarUsage'

const UserItems = (props) => {
  const [userItems, setUserItems] = useState([]);
  const [startDate, changeStartDate] = useState("2020-01-01");
  const [endDate, changeEndDate] = useState("2021-08-01");
  const [lineData, setLineData] = useState([]);
  const [chartFilter, setChartFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [totalExpiredDollar, setTotalExpiredDollar] = useState(0);
  const [totalUsedDollar, setTotalUsedDollar] = useState(0);


  const { data, loading, error } = useQuery(UserItemsQuery, {
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

  const filterItems = (itemArr, uniqueMonths) => {
    const newArr = itemArr.filter((item) =>
      uniqueMonths.includes(new Date(item.createdAt).toISOString().substr(0, 7))
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
    const uniqueMonths = final.filter((v, i, a) => a.indexOf(v) === i);
    let items = filterItems(userItems, uniqueMonths);
    setFilteredItems(items);

    const sumMap = {};
    uniqueMonths.forEach((month) => (sumMap[month] = 0));

    items.reduce((acc, cur) => {
      const createdAt = new Date(cur.createdAt).toISOString().substr(0, 7);

      let sum = (cur.price/100) * (cur.quantityUsed/cur.originalQuantity)

      if(cur.itemStatus === ("EXPIRED") || cur.itemStatus === ("EXPIRED_REMOVED")){
          sum += (cur.price/100) *-1 * ((cur.originalQuantity - cur.quantityUsed)/cur.originalQuantity)
      }

      acc[createdAt] += sum
      return acc;
    }, sumMap);

    let totalDollarsExpired = 0
    let totalDollarsUsed = 0

    items.forEach(item => {
        if (item.itemStatus.includes('EXPIRED')){
            totalDollarsExpired += ((item.price/100) * ((item.originalQuantity - item.quantityUsed) / (item.originalQuantity)))
        }
        totalDollarsUsed += ((item.price/100) * (item.quantityUsed / item.originalQuantity))
    })

    setTotalExpiredDollar(totalDollarsExpired.toFixed(2))
    setTotalUsedDollar(totalDollarsUsed.toFixed(2))

    const lineData = [];
    for (const [key, value] of Object.entries(sumMap)) {
      lineData.push({ month: key, dollars: value });
    }
    setLineData(lineData);
  }, [startDate, endDate, userItems, chartFilter]);

  return (
    <div>
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
      <TotalDollarUsage totalUsedDollar={totalUsedDollar} totalExpiredDollar={totalExpiredDollar}/>
      <MoneyLineChart data={lineData} />
      <EnhancedTable items={filteredItems} />
    </div>
  );
};

export default UserItems;
