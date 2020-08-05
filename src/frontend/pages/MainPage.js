import React, { Component } from 'react';
import CardList from './CardList.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestPage.css';
import {Button} from 'react-bootstrap';
import { withRouter } from 'react-router';
import Detail from "./Detail.js";
import Canvas from "./Canvas.js";
import Visualize from './Visualize.js';
//import ScriptTag from 'react-script-tag';

class MainPage extends Component {
  constructor(){
    super();
    this.state = {
      steps: [
        {
          "name":"Connect to Video",
          "imgid": 1,
          "url":"https://image.freepik.com/free-vector/vintage-glass-dome-wooden-tray-realistic_107791-236.jpg",
          "detail": "abc dbbfeirwob eurwhv euwiehrwih iwieriwehrwi weruhwriwb dirh fhwriwhrs bwuerwehrsibcdwir  weiurhwibdsfsrewirfh wergwbwe ewef"
        },
        {
          "name":"Emotion Analyzation",
          "imgid": 2,
          "url":"https://image.freepik.com/free-vector/vintage-glass-dome-wooden-tray-realistic_107791-236.jpg",
          "detail": "abc dbbfeirwob eurwhv euwiehrwih iwieriwehrwi weruhwriwb dirh fhwriwhrs bwuerwehrsibcdwir  weiurhwibdsfsrewirfh wergwbwe ewef"
        },
        {
          "name":"Data Visualization",
          "imgid": 3,
          "url":"https://image.freepik.com/free-vector/vintage-glass-dome-wooden-tray-realistic_107791-236.jpg",
          "detail": "abc dbbfeirwob eurwhv euwiehrwih iwieriwehrwi weruhwriwb dirh fhwriwhrs bwuerwehrsibcdwir  weiurhwibdsfsrewirfh wergwbwe ewef"
        }],
      stepId: 0,
      tstamp: [],
      engagement: [],
      joy: [],
      negative: [],
      flag: 0,
    };
  }

  updateExpression = (tstamp, engagement, joy, negative) => {
    var tlist = this.state.tstamp;
    tlist.push(tstamp);
    this.setState({tstamp: tlist});

    this.setState({flag: (this.state.flag + 1) % 10});

    this.state.engagement.push(engagement);
    this.state.joy.push(joy);
    this.state.negative.push(negative);

  }

  onSearchChange = (id) => {
    this.setState({stepId: id - 1});
  }


  componentDidMount(){}

  render() {
    return (
      <div>
      <div id='bg'>
        <div className="main-title-d">
          <h1 id='title'>Project &nbsp;<span className= "sf">Int Elligence</span></h1>
          <p className="sTitle">Where do your memory abilities rank compared to everyone else? </p>
          <div  className="button-m">
          <Button variant="warning"  className="nav-testbutton" href="/pretest">Try Our Demo</Button>
          </div>
        </div>
        <div className="main-title-m">
          <h1 className='title-m'>Project</h1>
          <h2 className= "sf-m">Int Elligence</h2>
          <p className="sPhrase-m">Where do your memory abilities rank compared to everyone else? </p>
          <div  className="button-m">
          <Button variant="warning"  className="nav-testbutton" href="/pretest">Try Our Demo</Button>
          </div>
        </div>
      </div>
      <div className="introclass">
        <p className='sTitle'>Who are we?</p>
          <p className="intro">We’re interested in collecting a lot of information from people around the
          world to tell us more about how our brains work to remember. Our task suite examines the what,
          where, and when of memory. We provide a rich space by which to investigate memory differences
           from those with superior memory to those experiencing memory difficulties. Take these three
           tasks to test your memory and see how you score!
          </p>

        <Button className="testButtonDisplay" href="/about">Learn More</Button>
      </div>
      <div className="projclass">
      <CardList steps={this.state.steps} onSearchChange={this.onSearchChange} id={this.state.stepId}/>
      </div>
      <Detail id={this.state.stepId + 1} name={this.state.steps[this.state.stepId].name} detail={this.state.steps[this.state.stepId].detail}/>

      <Canvas updateExpression={this.updateExpression}/>
      <Visualize timestamp={this.state.tstamp} engagement={this.state.engagement} joy={this.state.joy} negative={this.state.negative} flag={this.state.flag}/>
      </div>
    );
  }
}

export default withRouter(MainPage);
