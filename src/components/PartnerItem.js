import React, { Component } from 'react';
import PartnerItemVersion from './PartnerItemVersion';

class PartnerItem extends Component {
  render() {
    const WrapTag = this.props.wrapTag !== undefined ? `${this.props.wrapTag}`:'div';
    let partnerItemVersions = this.props.partner.versions.map(partnerItemVersion => {
        return(<PartnerItemVersion key={partnerItemVersion.vurl} partnerItemVersion={partnerItemVersion} />);
      });
    return (
      <WrapTag className="partner">
        <div className="partnerHeader">
          <img src={this.props.partner.logo} alt={this.props.partner.name} width="150" />
          <h2 className="partnerId">{this.props.partner.name}</h2>
          <div className="partnerType">{this.props.partner.sitetype}</div>
        </div>
        <ul className="versions">
          {partnerItemVersions}
        </ul>
      </WrapTag>
    );
  }
}

export default PartnerItem;
