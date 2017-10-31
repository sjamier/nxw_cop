import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { FBDB_Config } from './config/fbconfig';
import * as firebase from "firebase";

import Partners from './components/Partners';
import Partner from './components/Partner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnersData : [],
      lastPartnerKey : '',
      PartnersHTMLRoutes : [],
    };
    this.nxw_copFBDB = firebase.initializeApp(FBDB_Config); // Initialize Firebase
    this.partnersFBDB = this.nxw_copFBDB.database().ref().child('partners');
  }

  onReloadTrigger(editedPartner) {
    const partnerDBKey = editedPartner.fbdbkey;
    delete editedPartner["fbdbkey"];
    console.log('editedPartner : '+JSON.stringify(editedPartner));
    this.partnersFBDB.child(partnerDBKey).set(editedPartner);
    this.initState();
  }

  initState() {
    this.partnersFBDB
    .limitToLast(1)
    .on('child_added', (snap) => {
      return new Promise((resolve, reject) => {
        this.setState({ lastPartnerKey : snap.key });
        console.log("WillMount !! lastPartnerKey : "+this.state.lastPartnerKey);
        resolve('done');
      })
      .then((msg) => {
        console.log('msg : '+msg);
        return new Promise((resolve, reject) => {
          let currentPartners = [];
          this.partnersFBDB.on('child_added', snap => {
            currentPartners.push({
              fbdbkey : snap.key,
              id : snap.val().id,
              name : snap.val().name,
              logo : snap.val().logo,
              sitetype : snap.val().sitetype,
              versions : snap.val().versions,
            });
            if (snap.key === this.state.lastPartnerKey) resolve(currentPartners);
          });
        })
      })
      .then((partnersDB) => {
        this.setState({
          partnersData : partnersDB,
          PartnersHTMLRoutes : partnersDB
          .map( partner => {
            const PartnerSection = () => {
              // console.log("building route for : "+partner.name);
              return ( <Partner key={partner.fbdbkey} partner={partner}/> );
            }
            return ( <Route key={partner.fbdbkey} path={`/${partner.name}/`} partner={partner} component={ PartnerSection } /> );
          })
        })
        console.log('partnersFBDB :'+this.partnersFBDB);
        console.log("WillMount !!    - this.state.partnersData : "+this.state.partnersData);
      })
    });
  }

  componentWillMount() {
    this.initState();
  }
  componentDidMount() {
    console.log("DidMount !!    - this.state.partnersData : "+this.state.partnersData);
  }

  render() {
    console.log("Rendering !!");
    const PartnersList = () => { return ( <Partners partners={this.state.partnersData}  onReloadTrigger={ this.onReloadTrigger.bind(this) } /> ); };
    // const AddPartner = () => { return ( <PartnerAdd partners={this.state.partnersData} onPartnerAdded={ this.onPartnerAdded.bind(this) }/> ); };
    return (
      <Router>
        <div className="container main" data-reactroot="root">
          <div className="header jumbotron">
            <h1>Castor Onboarding Partners</h1>
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
