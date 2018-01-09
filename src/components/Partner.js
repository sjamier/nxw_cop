import React, { Component } from 'react';
import * as firebase from "firebase";
import moment from 'moment';

import PartnerBadge from './PartnerBadge';
import PartnerProfile from './PartnerProfile';

class Partner extends Component {
  constructor(props) {
    super(props);
    this.onPartnerUpdate = this.partnerUpdate.bind(this);
  }
  partnerUpdate(partnerid, what, newValue) {
    const dataSync = Object.assign({}, this.props.partner);
    const FDBKey = dataSync.fbdbkey;
    delete dataSync["fbdbkey"];
    dataSync[what] = newValue;
    dataSync.lastupdate = moment(new Date()).format('DD.MM.YYYY');
    console.log('newValue :'+dataSync[what]+" - new Update Date : "+new Date());
    console.log('about to record '+what+' update to FBDB for partner ID : '+partnerid+'  - '+what+' newValue : '+JSON.stringify(dataSync[what]));
    console.log(JSON.stringify(dataSync));

    const partnersFBDB = firebase.database().ref().child('partners');
    return partnersFBDB.child(FDBKey).set(dataSync);
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
