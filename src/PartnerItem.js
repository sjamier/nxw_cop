import React, { Component } from 'react';
import PartnerItemVersion from './PartnerItemVersion';

class PartnerItem extends Component {
  render() {
    let partnerItemVersions;
    partnerItemVersions = this.props.partner.versions.map(partnerItemVersion => {
      return(
        <PartnerItemVersion key={partnerItemVersion.vurl} partnerItemVersion={partnerItemVersion} />
      );
    });
    return (
      <div className="partner">
        <div className="partnerHeader">
          <h2 className="partnerId">{this.props.partner.name}</h2>
          <div className="partnerType">{this.props.partner.sitetype}</div>
        </div>
        <ul className="versions">
          {partnerItemVersions}
        </ul>
      </div>
    );
  }
}

export default PartnerItem;
