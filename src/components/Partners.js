import React, { Component } from 'react';
import PartnersFilters from './PartnersFilters';
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
    } else { console.log("Can't load da sheet !"); }
    return (
      <div className="partners">
        <PartnersFilters partnersData={this.props.partners} />
        <ul>
          {partnerItems}
        </ul>
      </div>
    );
  }
}

export default Partners;
