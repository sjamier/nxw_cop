import React, { Component } from 'react';
import * as firebase from "firebase";

class PartnerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitetypes : ["CART", "STORE", "IAP", "CONNECT"],
      partner : {
        id : '',
        name : '',
        logo : '',
        sitetype : '',
        confluence : '',

      }
    }
    this.partnersFBDB = firebase.database().ref().child('partners');
    this.updateState = this.updateState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  updateState(e){
    const stateObj = this.state.partner;
    if (e.target.name === 'confluence') stateObj[e.target.name] = e.target.value.toUppercase();
    else stateObj[e.target.name] = e.target.value;
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
      confluence: this.state.partner.confluence,
      versions : [],
      jiratickets : [],
      urlsprep : [],
    }
    console.log('newPartner : '+JSON.stringify(newPartner)+' - '+newPartner.name+ ' - '+this.state.partner.name)
    this.props.onPartnerAdded(newPartner);
  };

  componentDidMount() {
  }

  render(){
    const listTypeOptions = this.state.sitetypes.map( type => { return( <option key={type} value={type}>{type}</option> ) });
    return(
      <li id="partner-breeder" className="partner-badge">
        <form action="POST" onSubmit={ this.onSubmit }>
          <select name="sitetype" value={ this.state.partner.sitetype } onChange={ this.updateState }>
            {listTypeOptions}
          </select>
          <input name="name" type="text" placeholder="Name" value={ this.state.partner.name } onChange={ this.updateState } />
          <input name="logo" type="text" placeholder="Logo" value={ this.state.partner.logo } onChange={ this.updateState } />
          <input name="confluence" type="text" placeholder="Confluence Url" value={ this.state.partner.confluence } onChange={ this.updateState } />
          <input type="submit" value="OK"/>
        </form>
      </li>
    );
  }
}

export default PartnerAdd;
