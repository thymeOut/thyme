import React from 'react';

const TotalDollarUsage = (props) => {
    return <div>
        <h4>Money Wasted:  ${props.totalExpiredDollar}</h4>
        <h4>Money Used:  ${props.totalUsedDollar}</h4>
    </div>
}

export default TotalDollarUsage