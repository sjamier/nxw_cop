import React, { Component } from 'react';
import * as firebase from "firebase";

class PartnerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partner : {
        id : '',
        name : '',
        logo : '',
        sitetype : '',
        vurl : 'img/CAN021r4.jpg',
        vdate : '',
        vstatus : 'NEW',
        vcomment : 'Gathering Tools...'
      }
    }
    this.partnersFBDB = firebase.database().ref().child('partners');
    this.updateState = this.updateState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  updateState(e){
    const stateObj = this.state.partner;
    stateObj[e.target.name] = e.target.value;
    this.setState({ partner : stateObj });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("Recording data for : "+this.state.partner.name);
    this.partnersFBDB.limitToLast(1).on('child_added', snap => {
      let newPartnerId = snap.val().id + 1;
      console.log("new PartnerId : "+ newPartnerId);
      const syncPartnerState = this.state.partner;
      syncPartnerState.id = newPartnerId;
      this.setState({ partner : syncPartnerState });
    })
    let newPartner = {
      id : this.state.partner.id,
      name : this.state.partner.name,
      logo : this.state.partner.logo,
      sitetype : this.state.partner.sitetype,
      versions : [{
        vurl : this.state.partner.vurl,
        vdate : this.state.partner.vdate,
        vstatus : this.state.partner.vstatus,
        vcomment : this.state.partner.vcomment,
      }],
      jiratickets : [{
        jiranum : '',
        jiradesc : '',
        jirastate : ''
      }]
    }
    console.log('newPartner : '+JSON.stringify(newPartner)+' - '+newPartner.name+ ' - '+this.state.partner.name)
    this.props.onPartnerAdded(newPartner);
  };

  componentDidMount() {
  }
  render(){
    console.log('Pass HERE ');
    return(
      <li id="partner-breeder" className="partner-badge">
        {/* <h3>New Onboarding Partner</h3> */}
        <form action="POST" onSubmit={ this.onSubmit }>
          <input name="sitetype" type="text" placeholder="CART, STORE, ..." value={ this.state.partner.sitetype } onChange={ this.updateState } />
          <input name="name" type="text" placeholder="Name" value={ this.state.partner.name } onChange={ this.updateState } />
          <input name="logo" type="text" placeholder="Logo" value={ this.state.partner.logo } onChange={ this.updateState } />
          {/* <input name="vurl" type="text" placeholder="Mockup Url" value={ this.state.partner.vurl } onChange={ this.updateState } />
          <input name="vdate" type="text" placeholder="Date Started" value={ this.state.partner.vdate } onChange={ this.updateState } />
          <input name="vstatus" type="text" placeholder="Mockup status: 'ok', 'ko', 'wip', 'ok old'" value={ this.state.partner.vstatus } onChange={ this.updateState } />
          <textarea name="vcomment" placeholder="Comment" value={ this.state.partner.vcomment } onChange={ this.updateState } /> */}
          <input type="submit" value="OK"/>
        </form>
      </li>
    );
  }
}

export default PartnerAdd;
