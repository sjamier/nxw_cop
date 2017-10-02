import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { FBDB_Config } from './config/fbconfig'
import * as firebase from "firebase";

import Partners from './components/Partners';
import Partner from './components/Partner';


class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase
    this.nxw_copFBDB = firebase.initializeApp(FBDB_Config);
    this.partnersFBDB = this.nxw_copFBDB.database().ref().child('partners');
    this.state = {
      partnersData : [],
      PartnersHTMLRoutes : [],
    };
  }

  componentWillMount() {
    console.log("WillMount !!    - this.state.partnersData : "+this.state.partnersData);
    let currentPartners = this.state.partnersData;
    this.partnersFBDB.on('child_added', snap => {
      currentPartners.push({
        id: snap.val().id,
        logo: snap.val().logo,
        name: snap.val().name,
        sitetype: snap.val().sitetype,
        versions: snap.val().versions,
      });
      this.setState({
        partnersData : currentPartners,
        PartnersHTMLRoutes : currentPartners
          .map( partner => {
            const PartnerSection = () => {
              console.log("building route for : "+partner.name);
              return ( <Partner key={partner.id} partner={partner} /> );
            }
            return ( <Route key={partner.id} path={`/${partner.name}/`} partner={partner} component={ PartnerSection } /> );
          })
      })
    })
    console.log('partnersData :'+currentPartners);
    console.log('partnersFBDB :'+this.partnersFBDB);
  }

  componentDidMount() {
    console.log("DidMount !!    - this.state.partnersData : "+this.state.partnersData);
  }

  render() {
    console.log("Rendering !!    - this.state.partnersData : "+this.state.partnersData);
    const PartnersList = () => {
      return (
        <Partners partners={this.state.partnersData} />
      );
    }
    return (
      <Router>
        <div className="container main" data-reactroot="root">
          <div className="header jumbotron">
            {/*<img src={ BgImg } alt="Nexway Onboarding" />*/}
            <h1><span className="f-letter">C</span>astor <span className="f-letter">O</span>nboarding <span className="f-letter">P</span>artners</h1>
          </div>
          <Switch>
            <Route exact path="/" render={ PartnersList }/>
            { this.state.PartnersHTMLRoutes }
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
