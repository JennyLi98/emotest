import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Button, Row, Col} from 'react-bootstrap';
import './../css/App.css';

import {BrowserRouter, Route, Link} from 'react-router-dom';

import MLogo from './../imgs/letter_m_blue.png';
import MainPage from './MainPage.js';

const testInfo =
[
  [
  "https://www.elitetrimworks.com/skin1/images/gallery/square/square%20columns_27PM.png"
  ],
[
  "https://live.staticflickr.com/3514/3810627510_d9a567624a_b.jpg"
  ]
];

class Main extends Component {
  constructor(){
    super();
    this.state={

    }
  }

  componentDidMount(){
  }



  render() {
    return (
      <div>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="content-wrapper">
          <BrowserRouter>
            <Navbar style={{backgroundColor: 'black'}} variant="dark" expand="md">
              <img src={MLogo} width="50px" style={{marginRight: 50+'px'}}/>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/" style={{fontSize: 20+'px'}}>About Us</Nav.Link>
                  <Nav.Link href="/about" style={{fontSize: 20+'px'}}>Video Input</Nav.Link>
                  <Nav.Link href="/faq" style={{fontSize: 20+'px'}}>Emotion Analyzation</Nav.Link>
                  <Nav.Link href="/contact" style={{fontSize: 20+'px'}}>Data Visualization</Nav.Link>
                </Nav>
                <Button variant="warning" className="nav-testbutton" href="/pretest">Try Our Demo</Button>
              </Navbar.Collapse>
            </Navbar>
            <MainPage/>
            <div className="push"></div>
          </BrowserRouter>
        </div>
        <footer className="footer">
          <div className="footer-content">
          <p>
          © Copyright 2020, Int Elligence.
          </p>
          <p>
          All Rights Reserved.
          </p>
          <p>
          Int Elligence is a Group Project made by the members in Empath Affectiva.
          </p>
          </div>
        </footer>
    </div>
    );
  }
}

export default Main;
