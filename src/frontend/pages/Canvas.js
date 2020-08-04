import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestPage.css';
import { withRouter } from 'react-router';

class Canvas extends Component {
  constructor(){
    super();
    this.state = {
      detector:null,
    };
  }

  componentDidMount(){
    var divRoot = document.querySelector("#affdex_elements");
    var width = 640;
    var height = 480;
    //var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
    //Construct a CameraDetector and specify the image width / height and face detector mode.
    //var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

    //Enable detection of all Expressions, Emotions and Emojis classifiers.
    //detector.detectAllEmotions();
    //detector.detectAllExpressions();
    //detector.detectAllEmojis();
    //detector.detectAllAppearance();

  }

  render() {
    return (
      <div>
        <div id="affdex_elements" className="canvas"></div>
        <strong>EMOTION TRACKING RESULTS</strong>
        <div id="results"></div>
        <div>
          <strong>DETECTOR LOG MSGS</strong>
        </div>
        <div id="logs"></div>
        <div>
          <button id="start" onClick="onStart()">Start</button>
          <button id="stop" onClick="onStop()">Stop</button>
          <button id="reset" onClick="onReset()">Reset</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Canvas);
