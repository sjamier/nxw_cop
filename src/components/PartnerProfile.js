import React, { Component } from 'react';

class PartnerMockup extends Component {
  render() {
    let Comment = this.props.partnerMockupVersion.vcomment !== "" ? <div className="version-comment"><span>{this.props.partnerMockupVersion.vcomment}</span></div> : '';
    return(
      <li className="version">
        <a href={`${this.props.partnerMockupVersion.vurl}`} target="_blank" rel="noopener noreferrer">
          <div className="version-date"><span>{this.props.partnerMockupVersion.vdate}</span></div>
          { Comment }
          <div className={`version-status ${this.props.partnerMockupVersion.vstatus}`}></div>
        </a>
      </li>
    );
  }
}

class PartnerMockups extends Component {
  render() {
    let partnerMockupVersions_SortByDateDesc = this.props.partner.versions.sort((a,b) => Date.parse(new Date(b.vdate.split(".").reverse().join("-"))) - Date.parse(new Date(a.vdate.split(".").reverse().join("-"))));
    console.log ("partnerMockupVersions_SortByDateDesc : "+partnerMockupVersions_SortByDateDesc[0].vdate);
    let partnerMockupVersions = partnerMockupVersions_SortByDateDesc
      .map(partnerMockupVersion => { return(<PartnerMockup key={partnerMockupVersion.vurl} partnerMockupVersion={partnerMockupVersion} />); }
    );
    return (
      <div className="mockups_section">
        <div className="header"><h3>Mockups</h3></div>
        <ul className="versions">
          { partnerMockupVersions }
        </ul>
      </div>
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
