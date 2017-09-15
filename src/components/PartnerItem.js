import React from 'react';
import createReactClass from 'create-react-class';

import PartnerItemVersion from './PartnerItemVersion';

const PartnerItem = createReactClass ({
  render() {
    const WrapTag = this.props.wrapTag !== undefined ? `${this.props.wrapTag}`:'div';
    let partnerItemVersions = this.props.partner.versions.map(partnerItemVersion => {
        return(<PartnerItemVersion key={partnerItemVersion.vurl} partnerItemVersion={partnerItemVersion} />);
      });
    return (
      <WrapTag className="partner" onClick={this.onClick}>
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
  },

  onClick(e, partner){
    console.log(this.props.partner.name);
    this.props.onBadgeClick(this.props.partner);
  }
});

export default PartnerItem;
