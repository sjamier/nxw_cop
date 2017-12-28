import React, { Component } from 'react';
import * as firebase from "firebase";

import PartnerBadge from './PartnerBadge';
import PartnerProfile from './PartnerProfile';

class Partner extends Component {
  constructor(props) {
    super(props);
    this.onPartnerUpdate = this.partnerUpdate.bind(this);
  }
  partnerUpdate(partnerid, what, newValue) {
    const dataSync = this.props.partner;
    dataSync[what] = newValue;
    console.log('newValue :'+newValue);
    console.log('about to record '+what+' update to FBDB for partner ID : '+partnerid+'  - '+what+' newValue : '+JSON.stringify(newValue));
    console.log(JSON.stringify(dataSync));

    const partnersFBDB = firebase.database().ref().child('partners');
    return partnersFBDB.child(dataSync.fbdbkey).child(what).set(newValue);
    // const partnerRef = partnerKey.child('versions').set(newValue);
  }
  render(){
    console.log(this.props.partner);
    return (
      <div className="partner-profile">
        <PartnerBadge partner={this.props.partner} clickable={false} />
        <PartnerProfile partner={this.props.partner} onProfileChange={ this.onPartnerUpdate }/>
      </div>
    );
  }
}

export default Partner;
