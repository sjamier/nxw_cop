import React, { Component } from 'react';
import PartnerMockups from './PartnerMockups';
import PartnerJTickets from './PartnerJTickets';
import PartnerUrlsPrep from './PartnerUrlsPrep';
import PartnerUrlsProd from './PartnerUrlsProd';

class PartnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerid : this.props.partner.id,
      mockupVersions : {},
      jiratickets : {},
      urlsprep : {},
      urlsprod : {},
    }
  }
  onMockupsChange(versions) {
    this.props.onProfileChange(this.state.partnerid, 'versions', versions);
  }
  onTicketsChange(tickets) {
    this.props.onProfileChange(this.state.partnerid, 'jiratickets', tickets);
  }
  onUrlsPrepChange(urlsprep) {
    this.props.onProfileChange(this.state.partnerid, 'urlsprep', urlsprep);
  }
  onUrlsProdChange(urlsprod) {
    this.props.onProfileChange(this.state.partnerid, 'urlsprod', urlsprod);
  }
  componentWillMount() {
    this.setState({
      mockupVersions : this.props.partner.versions,
      jiratickets : this.props.partner.jiratickets,
      urlsprep : this.props.partner.urlsprep,
      urlsprod : this.props.partner.urlsprod,
    })
  }
  render() {
    console.log(this.props);
    return(
      <div className="sections profile-sections">
        <PartnerMockups versions={this.state.mockupVersions} onMockupsChange={ this.onMockupsChange.bind(this) }/>
        <PartnerJTickets jiratickets={this.state.jiratickets} onTicketsChange={ this.onTicketsChange.bind(this) }/>
        <PartnerUrlsPrep urlsprep={this.state.urlsprep} onUrlsPrepChange={ this.onUrlsPrepChange.bind(this) }/>
        <PartnerUrlsProd urlsprod={this.state.urlsprod} onUrlsProdChange={ this.onUrlsProdChange.bind(this) }/>
      </div>
    );
  }
}
export default PartnerProfile;
