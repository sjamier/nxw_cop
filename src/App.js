import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import React, { Component } from 'react';

import BgImg from './img/john-towner-128480.jpg';
import Partners from './components/Partners';
import partnersData from './data/partnersData.json';

class App extends Component {
  constructor() {
    super();
    this.state = partnersData;
  }
  render() {
    const PartnersRN = (props) => {
      return ( <Partners partners={this.state.partners} /> );
      }
    return (
      <Router>
        <div className="container main">
          <div className="header jumbotron">
            <img src={BgImg} alt="Nexway Onboarding" />
            <h1><span className="f-letter">C</span>ustomer <span className="f-letter">O</span>nboarding <span className="f-letter">P</span>rogress</h1>
          </div>
          <Switch>
            <Route exact path="/" render={PartnersRN} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
