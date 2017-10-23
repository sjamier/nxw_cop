import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PartnerBadge extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      editBtn : false,
      deleteBtn : false,
    });
  }
  onEditPartner(e) {
    e.preventDefault();
  }
  onDeletePartner(e) {
    e.preventDefault();
  }
  render() {
    let WrapTag = this.props.wrapTag !== undefined ? `${this.props.wrapTag}`:'div';
    let EditBtns = this.state.editBtn || this.state.deleteBtn ?
      <div className="btn-group">
        { this.state.editBtn ? <a className='btn btn-sign' onClick={ this.onEditPartner.bind(this) }>...</a> : null }
        { this.state.deleteBtn ? <a className='btn btn-sign lowered-sign' onClick={ this.onDeletePartner.bind(this) }>\<u>*</u>/</a> : null }
      </div> : null;
    return (
      <WrapTag className="partner-badge">
        <div className="partner-header" onClick={this.onClick.bind(this)}>
          <div className="partner-logo"><img src={this.props.partner.logo} alt={this.props.partner.name} /></div>
          <h2 className="partner-id">{this.props.partner.name}</h2>
          <div className="partner-type">{this.props.partner.sitetype}</div>
        </div>
        { EditBtns }
      </WrapTag>
    );
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      this.setState({ editBtn : this.props.editMode });
      this.setState({ deleteBtn : this.props.deleteMode });
    }, 0);
  }

  onClick(e){
    if (this.props.clickable) this.props.history.push(`/${this.props.partner.name}`);
  }
};

const PartnerBadgeWithRouter = withRouter(PartnerBadge);
export default PartnerBadgeWithRouter;
