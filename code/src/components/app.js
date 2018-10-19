import React from "react"
import openGdaxWebsocket from "../gdax-websocket"
import { LineChart, Line, Tooltip, YAxis, XAxis, CartesianGrid, Legend } from 'recharts'

class App extends React.Component {

  state = {
    tickerMessages: []
  }

  componentDidMount() {
    this.websocket = openGdaxWebsocket("BTC-USD", this.handleNewTickerMessage)
  }

  componentWillUnmount() {
    this.websocket.close()
  }

  handleNewTickerMessage = newTickerMessage => {
    this.setState(previousState => ({
      tickerMessages: previousState.tickerMessages.concat([newTickerMessage])
    }))
  }

  render() {
    const data = [
      {name: '04:00', price: 4000, pv: 2400, amt: 2400},
      {name: '07:00', price: 3000, pv: 1398, amt: 2210},
      {name: '09:00', price: 2000, pv: 9800, amt: 2290},
      {name: '12:00', price: 2780, pv: 3908, amt: 2000},
      {name: '14:00', price: 1890, pv: 4800, amt: 2181},
      {name: '18:00', price: 2390, pv: 3800, amt: 2500},
      {name: '23:00', price: 3490, pv: 4300, amt: 2100},
    ]
    return (
    <div>
        <div className="ticker-container">
          <h2>Bitcoin Ticker</h2>
           <div className="ticker">
              <LineChart width={600} height={300} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="price" stroke="#84DCCF" />
            </LineChart>
          </div>
        </div>
    </div>

    )
  }

}

export default App
