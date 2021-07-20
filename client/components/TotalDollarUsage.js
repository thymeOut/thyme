import React, { useEffect, useState } from 'react';

const TotalDollarUsage = (props) => {
  const [totalExpiredDollar, setTotalExpiredDollar] = useState(0);
  const [totalUsedDollar, setTotalUsedDollar] = useState(0);

  useEffect(() => {
    let totalDollarsExpired = 0;
    let totalDollarsUsed = 0;

    props.items.forEach((item) => {
      if (item.itemStatus.includes('EXPIRED')) {
        totalDollarsExpired +=
          (item.price / 100) *
          ((item.originalQuantity - item.quantityUsed) / item.originalQuantity);
      }
      totalDollarsUsed +=
        (item.price / 100) * (item.quantityUsed / item.originalQuantity);
    });

    setTotalExpiredDollar(totalDollarsExpired.toFixed(2));
    setTotalUsedDollar(totalDollarsUsed.toFixed(2));
  }, [props.items]);

  return (
    <div className='totals'>
      <h4>
        Money Wasted:{' '}
        <div
          className={
            totalExpiredDollar < 0 ? 'in-the-money' : 'out-of-the-money'
          }
        >
          ${totalExpiredDollar * -1}
        </div>
      </h4>
      <h4>
        Money Used:{' '}
        <div
          className={
            totalUsedDollar > 0 ? 'in-the-money' : 'out-of-the-money'
          }
        >
          {' '}
          ${totalUsedDollar}
        </div>
      </h4>
      <h4>
        Net:{' '}
        <div
          className={
            totalUsedDollar - totalExpiredDollar > 0
              ? 'in-the-money'
              : 'out-of-the-money'
          }
        >
          {' '}
          ${(totalUsedDollar - totalExpiredDollar).toFixed(2)}
        </div>
      </h4>
    </div>
  );
};

export default TotalDollarUsage;
