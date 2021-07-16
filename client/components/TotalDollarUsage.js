import React from "react";

const TotalDollarUsage = (props) => {
  return (
    <div>
      <h4>
        Money Wasted:{" "}
        <div
          className={
            props.totalExpiredDollar < 0 ? "in-the-money" : "out-of-the-money"
          }
        >
          ${props.totalExpiredDollar*-1}
        </div>
      </h4>
      <h4>
        Money Used:{" "}
        <div
          className={
            props.totalExpiredDollar > 0 ? "in-the-money" : "out-of-the-money"
          }
        >
          {" "}
          ${props.totalUsedDollar}
        </div>
      </h4>
      <h4>
        Net:{" "}
        <div
          className={
              props.totalUsedDollar - props.totalExpiredDollar > 0 ? "in-the-money" : "out-of-the-money"
          }
        >
          {" "}
          ${(props.totalUsedDollar - props.totalExpiredDollar).toFixed(2)}
        </div>
      </h4>
    </div>
  );
};

export default TotalDollarUsage;
