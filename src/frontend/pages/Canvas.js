import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/TestPage.css';
import { withRouter } from 'react-router';

class Canvas extends Component {
  constructor(){
    super();
    this.state = {
      detector:null,
      timeStamp: "",
      numOfFace: "",
      appearance: "",
      emotion: "",
      expression: "",
    };
  }

  drawFeaturePoints = (img, featurePoints) => {
  var contxt = document.querySelector('#face_video_canvas').getContext('2d');

  var hRatio = contxt.canvas.width / img.width;
  var vRatio = contxt.canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);

  contxt.strokeStyle = "#FFFFFF";
  for (var id in featurePoints) {
    contxt.beginPath();
    contxt.arc(featurePoints[id].x,
      featurePoints[id].y, 2, 0, 2 * Math.PI);
    contxt.stroke();
  }
}

  createAffDetector = () => {
    const self = this;
    var divRoot = document.querySelector("#affdex_elements");
    var width = 640;
    var height = 480;
    var faceMode = window.affdex.FaceDetectorMode.LARGE_FACES;
    var detector = new window.affdex.CameraDetector(divRoot, width, height, faceMode);
    this.setState({detector: detector});
    detector.detectAllEmotions();
    detector.detectAllExpressions();
    detector.detectAllEmojis();
    detector.detectAllAppearance();

    //Add a callback to notify when the detector is initialized and ready for runing.
    detector.addEventListener("onInitializeSuccess", function() {
      //log('#logs', "The detector reports initialized");
      //Display canvas instead of video feed because we want to draw the feature points on it
      document.querySelector("#face_video_canvas").style.display = "block";
      document.querySelector("#face_video").style.display = "none";
    });

    detector.addEventListener("onWebcamConnectSuccess", function() {
      console.log("#logs:\t\tWebcam access allowed");
    });

    detector.addEventListener("onWebcamConnectFailure", function() {
      console.log("#logs:\t\tWebcam access denied");
    });

    detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
      self.setState({timeStamp: timestamp.toFixed(2) + ""});
      self.setState({numOfFace: faces.length + ""});
      if (faces.length > 0) {
        self.setState({appearance: JSON.stringify(faces[0].appearance)});
        self.setState({emotion: timestamp.toFixed(2) + JSON.stringify(faces[0].emotions, function(key, val) {
          return val.toFixed ? Number(val.toFixed(0)) : val;
          })
        });
        self.setState({expression: JSON.stringify(faces[0].expressions, function(key, val) {
          return val.toFixed ? Number(val.toFixed(0)) : val;
        })});

        self.props.updateExpression(timestamp.toFixed(2), faces[0].emotions.engagement.toFixed(0), faces[0].emotions.joy.toFixed(0), Math.max(faces[0].emotions.fear.toFixed(0), faces[0].emotions.anger.toFixed(0)));

        if(document.querySelector('#face_video_canvas') != null)
          self.drawFeaturePoints(image, faces[0].featurePoints);
      }
    });
  }

  onStart = () => {
    console.log(this.state.detector);
    if (this.state.detector && !this.state.detector.isRunning) {
      document.querySelector("#logs").innerHTML = "";
      this.state.detector.start();
    }
    console.log("#logs:\t\tClicked the start button");
  }

  onStop = () => {
    //log('#logs', "Clicked the stop button");
    if (this.state.detector && this.state.detector.isRunning) {
      this.state.detector.removeEventListener();
      this.state.detector.stop();
      console.log("#logs:\t\tClicked the stop button");
    }
  };

  onReset = () => {
    //log('#logs', "Clicked the reset button");
    if (this.state.detector && this.state.detector.isRunning) {
      this.state.detector.reset();

      console.log("#logs:\t\tClicked the reset button");
    }
  };

  componentDidMount(){

    //const affScript = document.createElement('script');

    //affScript.src = `https://download.affectiva.com/js/3.2.1/affdex.js`;
    //window.document.body.appendChild(affScript);
    //affScript.addEventListener('load', () =>{
      this.createAffDetector();
    //});

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
      <div className="canvas-content">
        <div id="affdex_elements" className="canvas"></div>
        <strong>EMOTION TRACKING RESULTS</strong>
        <div className="resultDisplay">
          <p>TimeStamp: {this.state.timeStamp}</p>
          <p>numOfFace: {this.state.numOfFace}</p>
          <p>appearance: {this.state.appearance}</p>
          <p>emotion: {this.state.emotion}</p>
          <p>expression: {this.state.expression}</p>
        </div>
        <div>
          <strong>DETECTOR LOG MSGS</strong>
        </div>
        <div id="logs"></div>
        <div>
          <button id="start" onClick={this.onStart}>Start</button>
          <button id="stop" onClick={this.onStop}>Stop</button>
          <button id="reset" onClick={this.onReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default withRouter(Canvas);
