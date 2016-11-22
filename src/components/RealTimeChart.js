import React, { Component } from 'react'
import RTChart from 'react-rt-chart';

export default class RealTimeChart extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    let chart = {
      color: {
          pattern: ['#bad820', '#aec7e8']
        }
    }

    let flow = {
      duration: 1000
    };

    let data = {
        date: new Date(),
        Purchase: this.props.data.amount
      };

      return <RTChart
              chart={chart}
              flow = {flow}
              fields={['Purchase']}
              data={data} />
      }
}
