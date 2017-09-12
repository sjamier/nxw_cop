import React, { Component } from 'react';
import PartnerItem from './PartnerItem';

class Partners extends Component {
  render() {
    let partnerItems;
    if (this.props.partners) {
      partnerItems = this.props.partners.map(partner => {
        return (
          <PartnerItem key={partner.name} partner={partner} />
          );
      });
    }
    return (
      <div>
        <div className="header">
          <h1>PARTNERSDEMO INDEX</h1>
        </div>
        <div className="partners">
          {partnerItems}
        </div>
      </div>
    );
  }
}

export default Partners;
