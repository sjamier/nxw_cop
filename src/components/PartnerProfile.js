import React, { Component } from 'react';

class PartnerMockup extends Component {
  render() {
    let comment = this.props.partnerMockupVersion.vcomment !== "" ? <div className="version-comment">{this.props.partnerMockupVersion.vcomment}</div> : '';
    return(
      <li className="version">
        <a href={`${this.props.partnerMockupVersion.vurl}`} target="_blank" rel="noopener noreferrer">
          <div className="version-date">{this.props.partnerMockupVersion.vdate}</div>
          <div className={`version-status ${this.props.partnerMockupVersion.vstatus}`}></div>
          {comment}
        </a>
      </li>
    );
  }
}

class PartnerMockups extends Component {
  render() {
    let partnerMockupVersions = this.props.partner.versions
      .map(partnerMockupVersion => {
        return(<PartnerMockup key={partnerMockupVersion.vurl} partnerMockupVersion={partnerMockupVersion} />);
      }
    );
    return (
      <ul className="versions">
        { partnerMockupVersions }
      </ul>
    );
  }
}

class PartnerProfile extends Component {
  render() {
    console.log(this.props);
    return(
      <PartnerMockups partner={this.props.partner} />
    );
  }
}
export default PartnerProfile;
