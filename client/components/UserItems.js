import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UserItemsQuery from "../../server/graphql/queries/UserItemsQuery.graphql";
import MoneyChart from "./MoneyChart";
import { Button, ButtonGroup } from "@material-ui/core";

const UserItems = (props) => {
  const [userItems, setUserItems] = useState([]);
  const [startDate] = useState("2020-01-01");
  const [endDate] = useState("2021-08-01");
  const [sums, setSums] = useState({});
  const [chartFilter, setChartFilter] = useState("EXPIRED");

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

  useEffect(() => {
    const daylist = getDaysArray(new Date(startDate), new Date(endDate));
    const final = daylist.map((v) => v.toISOString().slice(0, 7));
    const uniqueMonths = final.filter((v, i, a) => a.indexOf(v) === i);
    const sumMap = {};
    uniqueMonths.forEach((month) => (sumMap[month] = 0));

    console.log(userItems.filter((item) => item.itemStatus === chartFilter))
    const items = !chartFilter ? userItems : userItems.filter((item) => item.itemStatus === chartFilter);
    console.log(items)
    const sumOfPrice = items.reduce((acc, cur) => {
      const createdAt = new Date(cur.createdAt).toISOString().substr(0, 7);
      acc[createdAt] += cur.price / 100;
      return acc;
    }, sumMap);
    setSums(sumOfPrice);
  }, [startDate, endDate, userItems, chartFilter]);

  const state = {
    labels: Object.keys(sums),
    datasets: [
      {
        label: "Money $$$",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: Object.values(sums),
      },
    ],
  };
  return (
    <div>
      <ButtonGroup>
        <Button value="" onClick={(e) => filterChart(e)}>
          All
        </Button>
        <Button value="EXPIRED" onClick={(e) => filterChart(e)}>
          Expired
        </Button>
        <Button value="EXPIRED" onClick={(e) => filterChart(e)}>
          Used
        </Button>
      </ButtonGroup>
      <MoneyChart data={state} />
    </div>
  );
};

export default UserItems;
