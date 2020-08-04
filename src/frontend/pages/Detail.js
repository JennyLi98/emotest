import React, { Component } from 'react';
import CardList from './CardList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestPage.css';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router';

class Detail extends Component {
  constructor(){
    super();
    this.state = {
      steps: []
    };
  }

  componentDidMount(){}

  render() {
    return (
      <div>
      <div className="introclass">
        <p className='sTitle'>Step {this.props.id}: {this.props.name}</p>
          <p className="intro">
          {this.props.detail}
          </p>
      </div>
      </div>
    );
  }
}

export default Detail;
