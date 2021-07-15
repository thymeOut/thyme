import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import UserItemsQuery from "../../server/graphql/queries/UserItemsQuery.graphql";
import { Line } from "react-chartjs-2";

// const labels = Utils.months({count: 7});
// const data = {
// //   labels: labels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };

// const config = {
//     type: 'line',
//     data: data,
//   };

// const stackedLine = new Chart(config);

const UserItems = (props) => {
  const [userItems, setUserItems] = useState([]);
  const [startDate] = useState('2020-01-01');
  const [endDate] = useState('2021-08-01');
  const [sums, setSums] = useState({})
  
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

  console.log(localStorage.getItem('user-id'))

  useEffect(()=> {
      console.log(userItems)
    const daylist = getDaysArray(new Date(startDate), new Date(endDate));
    const final = daylist.map((v) => v.toISOString().slice(0, 7));
    const uniqueMonths = final.filter((v, i, a) => a.indexOf(v) === i);
    
    const sumMap = {}
    userItems.map(item => console.log(item))
    uniqueMonths.forEach(month => sumMap[month]=0)
    console.log(uniqueMonths)
    
    const test = userItems.reduce((acc, cur) => {
        const createdAt = new Date(cur.createdAt).toISOString().substr(0, 7)
        acc[createdAt] += cur.price
        return acc
    }, sumMap)

    setSums(test)

    

  }, [startDate, endDate, userItems])


console.log(sums)
  

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
  //   console.log(data);
  return (
    <div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export default UserItems;
