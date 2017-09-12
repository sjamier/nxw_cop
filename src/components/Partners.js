import React, { Component } from 'react';

import PartnerItem from './PartnerItem';

class Partners extends Component {
  render() {
    let partnerItems;
    console.log(this.props);
    if (this.props.partners) {
      partnerItems = this.props.partners.map(partner => {
        return (
          <PartnerItem key={partner.name} partner={partner} />
          );
      });
    } else {console.log("Can't load data")}
    return (
        <ul className="partners">
          {partnerItems}
        </ul>
    );
  }
}

export default Partners;
