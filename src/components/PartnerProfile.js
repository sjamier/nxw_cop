import React, { Component } from 'react';

class PartnerMockup extends Component {
  render() {
    return("");
  }
}

class PartnerProfile extends Component {
  render() {
    let partnerMockupVersions = this.props.partner.versions
      .map(partnerMockupVersion => {
        return(<PartnerMockup key={partnerMockupVersion.vurl} partnerMockupVersion={partnerMockupVersion} />);
      }
    );
    let comment = this.props.partnerMockupVersion.vcomment !== "" ? `<div className="version-comment">{this.props.partnerItemVersion.vcomment}</div>` : '';

    return (
      <li className="version">
        <a href={`${this.props.partnerItemVersion.vurl}`} target="_blank" rel="noopener noreferrer">
          <div className="version-date">{this.props.partnerItemVersion.vdate}</div>
          <div className={`version-status ${this.props.partnerItemVersion.vstatus}`}></div>
          {comment}
        </a>
      </li>
    );
  }
}

export default PartnerProfile;
