import React, { Component } from 'react';
import PartnerBadge from './PartnerBadge';
import PartnerProfile from './PartnerProfile';

class Partner extends Component {
  render(){
    console.log(this.props.partner);
    return (
      <div className="partner-profile">
        <PartnerBadge partner={this.props.partner} wrapTag="div" />
        <PartnerProfile  partner={this.props.partner} />
      </div>
    );
  }
}

export default Partner;
