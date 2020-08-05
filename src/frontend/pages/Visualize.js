import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import createPlotlyComponent from 'react-plotly.js/factory';
import { withRouter } from 'react-router';

const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

class Visualize extends Component {

  constructor(){
    super();
    this.state = {
      flag:0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.flag!==prevState.flag){
      console.log("getDerivedStateFromProps reached!" + nextProps.flag);
      return {flag : nextProps.flag};
    }
    else return null;
  }

  render() {
    return (
      <div className="button-m">
      <Plot
        data={[
          {
            y: this.props.engagement,
            x: this.props.timestamp,
            name: 'Engagement',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {
            y: this.props.joy,
            x: this.props.timestamp,
            name: 'joy',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          },
          {
            y: this.props.negative,
            x: this.props.timestamp,
            name: 'negative',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'green'},
          },
        ]}
        layout={ {width: 800, height: 400, datarevision: this.state.flag, title: 'Affection Visualization' + this.state.flag} }
      />
      <p>{this.state.flag}</p>
      </div>
    );
  }
}

export default withRouter(Visualize);
