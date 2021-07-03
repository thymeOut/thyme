import React from 'react'
import { Button, Typography, Card } from '@material-ui/core';
export default function LandingPage() {


    return (
      <div>
        <Card className="Card">
          <h1 className="text">Stop losing money!</h1>
          <h3 className="text2">You know you're not going to cook that pork chop.. and brussel sprouts, really?</h3>
          <img className="img" alt="" src="http://cdn.shopify.com/s/files/1/2459/1583/articles/Orient-Refrigerators_large@2x.jpg?v=1515663297"></img>
        </Card>
        <Card className="Card1" style={{marginTop: "5%",}}>
          <img className="img1" alt="" src="https://opt.toiimg.com/recuperator/img/toi/m-61863614/61863614.jpg&width=500&resizemode=4"></img>
         <h1 className="text3">Stop losing money!</h1>
          <h3 className="text3">You know you're not going to cook that pork chop.. and brussel sprouts, really?</h3>
        </Card>
      </div>
    )
}
