import React, { Component } from 'react';

class PartnerItemVersion extends Component {
  render() {
    let comment;
    if (this.props.partnerItemVersion.vcomment !== "") {
      comment = <div className="versionComment">{this.props.partnerItemVersion.vcomment}</div>
    }

    return (
      <li className="version">
        <a href={`${this.props.partnerItemVersion.vurl}`} target="_blank" rel="noopener noreferrer">
          <div className="versionDate">{this.props.partnerItemVersion.vdate}</div>
          <div className={`versionStatus ${this.props.partnerItemVersion.vstatus}`}></div>
          {comment}
        </a>
      </li>
    );
  }
}

export default PartnerItemVersion;
