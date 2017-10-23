import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { FBDB_Config } from './config/fbconfig';
import * as firebase from "firebase";

import Partners from './components/Partners';
import Partner from './components/Partner';

class App extends Component {
  constructor(props) {
    super(props);
    this.nxw_copFBDB = firebase.initializeApp(FBDB_Config); // Initialize Firebase
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
      currentPartners.push({ copkey : snap.key,
                             id : snap.val().id,
                             name : snap.val().name,
                             logo : snap.val().logo,
                             sitetype : snap.val().sitetype,
                             versions : snap.val().versions,
                           })
    });
    setTimeout(() => {
      this.setState({
          partnersData : currentPartners,
          PartnersHTMLRoutes : currentPartners
            .map( partner => {
              const PartnerSection = () => {
                console.log("building route for : "+partner.name);
                return ( <Partner key={partner.copkey} partner={partner} /> );
              }
              return ( <Route key={partner.copkey} path={`/${partner.name}/`} partner={partner} component={ PartnerSection } /> );
            })
        })
    }, 1100);
    console.log('partnersData :'+currentPartners);
    console.log('partnersFBDB :'+this.partnersFBDB);
  }

  componentDidMount() {
    console.log("DidMount !!    - this.state.partnersData : "+this.state.partnersData);
  }
  render() {
    console.log("Rendering !!");
    const PartnersList = () => { return ( <Partners partners={this.state.partnersData} /> ); };
    // const AddPartner = () => { return ( <PartnerAdd partners={this.state.partnersData} onPartnerAdded={ this.onPartnerAdded.bind(this) }/> ); };
    return (
      <Router>
        <div className="container main" data-reactroot="root">
          <div className="header jumbotron">
            {/* <img src={ BgImg } alt="Nexway Onboarding" /> */}
            <h1><span className="f-letter">C</span>astor <span className="f-letter">O</span>nboarding <span className="f-letter">P</span>artners</h1>
          </div>
          <Switch>
            <Route exact path="/" render={ PartnersList } />
            {/* <Route exact path="/add" render={ AddPartner } /> */}
            { this.state.PartnersHTMLRoutes }
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
