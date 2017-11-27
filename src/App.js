import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { FBDB_Config } from './config/fbconfig'
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

  onDBSyncTrigger(partner,action) {
    const partnerDBKey = partner.fbdbkey;
    switch (action) {
      case 'edit':
        delete partner["fbdbkey"];
        this.partnersFBDB.child(partnerDBKey).set(partner);
        partner.fbdbkey = partnerDBKey
        break;
      case 'delete':
        this.partnersFBDB.child(partnerDBKey).remove();
        break;
      default:
        console.log("mmh.. shouldn't pass here...");
    }
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
            let newPartner = snap.val();
            newPartner.fbdbkey = snap.key;
            currentPartners.push(newPartner);
            if (snap.key === this.state.lastPartnerKey) resolve(currentPartners);
          });
        })
      })
      .then((partners) => {
        this.setState({
          partnersData : partners,
          PartnersHTMLRoutes : partners
          .map( partner => {
            const PartnerSection = () => { // console.log("building route for : "+partner.name);
              return ( <Partner key={partner.fbdbkey} partner={partner}/> );
            }
            return ( <Route key={partner.fbdbkey} path={`/nxw_cop/${partner.name.split(' ').join('')}/`} component={ PartnerSection } /> );
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
  render() {
    console.log("Rendering !!");
    const PartnersList = () => { return ( <Partners partners={this.state.partnersData}  onDBSyncTrigger={ this.onDBSyncTrigger.bind(this) } /> ); };
    // const AddPartner = () => { return ( <PartnerAdd partners={this.state.partnersData} onPartnerAdded={ this.onPartnerAdded.bind(this) }/> ); };
    return (
      <Router>
        <div className="container main" data-reactroot="root">
          <div className="header jumbotron">
            <h1>Castor Onboarding Partners</h1>
          </div>
          <Switch>
            <Route exact path="/nxw_cop/" render={ PartnersList } />
            <Route exact path="/nxw_cop/admin/" render={ PartnersList } />
            {/* <Route exact path="/add" render={ AddPartner } /> */}
            { this.state.PartnersHTMLRoutes }
          </Switch>
        </div>
      </Router>
    )
  }
  componentDidMount() {
    console.log("DidMount !!    - this.state.partnersData : "+this.state.partnersData);
  }
}

export default App;
