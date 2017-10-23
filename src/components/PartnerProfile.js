import React, { Component } from 'react';
import PartnerMockups from './PartnerMockups';

class PartnerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerid : this.props.partner.id,
      mockupVersions : {},
    }
  }
  onMockupsChange(versions) {
    this.props.onProfileChange(this.state.partnerid, 'versions', versions);
  }
  componentWillMount() {
    this.setState({ mockupVersions : this.props.partner.versions})
  }
  render() {
    console.log(this.props);
    return(
      <PartnerMockups versions={this.state.mockupVersions} onMockupsChange={ this.onMockupsChange.bind(this) }/>
    );
  }
}
export default PartnerProfile;
