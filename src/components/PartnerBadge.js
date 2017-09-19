import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PartnerBadge extends Component {
  render() {
    const WrapTag = this.props.wrapTag !== undefined ? `${this.props.wrapTag}`:'div';
    return (
      <WrapTag className="partner" onClick={this.onClick.bind(this)}>
        <div className="partner-header">
          <div className="partner-logo"><img src={this.props.partner.logo} alt={this.props.partner.name} /></div>
          <h2 className="partner-id">{this.props.partner.name}</h2>
          <div className="partner-type">{this.props.partner.sitetype}</div>
        </div>
      </WrapTag>
    );
  }

  onClick(e){
    this.props.history.push(`/${this.props.partner.name}`);
  }
};

const PartnerBadgeWithRouter = withRouter(PartnerBadge);
export default PartnerBadgeWithRouter;
