import React, { Component } from 'react';
import PartnerMockups from './PartnerMockups';
import PartnerJTickets from './PartnerJTickets';

class PartnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerid : this.props.partner.id,
      mockupVersions : {},
      jiratickets : {},
    }
  }
  onMockupsChange(versions) {
    this.props.onProfileChange(this.state.partnerid, 'versions', versions);
  }
  onTicketsChange(tickets) {
    this.props.onProfileChange(this.state.partnerid, 'jiratickets', tickets);
  }
  componentWillMount() {
    this.setState({ mockupVersions : this.props.partner.versions, jiratickets : this.props.partner.jiratickets })
  }
  render() {
    console.log(this.props);
    return(
      <div className="sections profile-sections">
        <PartnerMockups versions={this.state.mockupVersions} onMockupsChange={ this.onMockupsChange.bind(this) }/>
        <PartnerJTickets jiratickets={this.state.jiratickets} onTicketsChange={ this.onTicketsChange.bind(this) }/>
      </div>
    );
  }
}
export default PartnerProfile;
