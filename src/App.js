import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import { FBDB_Config } from './config/fbconfig'
import * as firebase from "firebase";

import Partners from './components/Partners';
import Partner from './components/Partner';


class PartnerAdd extends Component {
  render(){
    return(
      <div id="partner-breeder">
        <h3>New Onboarding Partner</h3>
        <form action="POST">
          <input type="text" placeholder="ID" />
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Logo" />
          <input type="text" placeholder="CART, STORE, ..." />
          <input type="text" placeholder="Mockup Url" />
          <input type="text" placeholder="Date Started" />
          <input type="text" placeholder="Mockup status: 'ok', 'ko', 'wip', 'ok old'" />
          <input type="textarea" placeholder="Comment" />
          <input type="submit" value="OK" />
        </form>
      </div>
    );
  }
}


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
    const PartnersList = () => { return ( <Partners partners={this.state.partnersData} /> ); };
    const AddPartner = () => { return ( <PartnerAdd partners={this.state.partnersData} /> ); };
    return (
      <Router>
        <div className="container main" data-reactroot="root">
          <div className="header jumbotron">
            {/*<img src={ BgImg } alt="Nexway Onboarding" />*/}
            <h1><span className="f-letter">C</span>astor <span className="f-letter">O</span>nboarding <span className="f-letter">P</span>artners</h1>
          </div>
          <Switch>
            <Route exact path="/" render={ PartnersList } />
            <Route exact path="/add" render={ AddPartner } />
            { this.state.PartnersHTMLRoutes }
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
