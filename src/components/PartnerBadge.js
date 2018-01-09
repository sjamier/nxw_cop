import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PartnerBadge extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      partner : {},
      editBtn : false,
      deleteBtn : false,
      showPartnerEditForm : false,
      partnerEdited : false,
    });
    this.onSubmit = this.onEditedPartner.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  onClick(e){
    if (this.props.clickable) this.props.history.push(`/nxw_cop/${this.props.partner.name.split(' ').join('')}`);
  }
  onEditPartner(e) {
    this.setState({ showPartnerEditForm : !this.state.showPartnerEditForm });
  }
  onDeletePartner(e) {
    e.preventDefault();
    this.props.onDeleted(this.state.partner);
  }
  updateState(e){
    const stateObj = this.state.partner;
    if (stateObj[e.target.name] !== e.target.value) {
      this.setState({ partnerEdited : true });
      stateObj[e.target.name] = e.target.value;
      this.setState({ partner : stateObj });
    }
  }
  onEditedPartner(e) {
    e.preventDefault();
    if (this.state.partnerEdited) {
      console.log('partnerEdited : '+this.state.partnerEdited);
      this.setState({ showPartnerEditForm : !this.state.showPartnerEditForm });
      this.props.onEdited(this.state.partner);
    } else {
      this.setState({ showPartnerEditForm : !this.state.showPartnerEditForm });
    }
  }

  componentWillMount() {
    let statePartnerInit = this.props.partner;
    statePartnerInit.fbdbkey = this.props.partner.fbdbkey;
    this.setState({ partner : statePartnerInit });
  }
  render() {
    let WrapTag = this.props.wrapTag !== undefined ? `${this.props.wrapTag}`:'div';
    let EditBtns = this.state.editBtn || this.state.deleteBtn ?
      <div className="btn-group">
        { this.state.editBtn ? <a className='btn btn-sign' onClick={ this.onEditPartner.bind(this) }>...</a> : null }
        { this.state.deleteBtn ? <a className='btn btn-sign lowered-sign' onClick={ this.onDeletePartner.bind(this) }>\<u>*</u>/</a> : null }
      </div> : null;
    return (
      this.state.showPartnerEditForm ?
        <li id="partner-editor" className="partner-badge">
          <form onSubmit={ this.onSubmit } >
            <input name="sitetype" type="text" placeholder="CART, STORE, ..." value={ this.state.partner.sitetype } onChange={ this.updateState } />
            <input name="name" type="text" placeholder="Name" value={ this.state.partner.name } onChange={ this.updateState } />
            <input name="logo" type="text" placeholder="Logo" value={ this.state.partner.logo } onChange={ this.updateState } />
            <input type="submit" value="OK"/>
          </form>
        </li>
      :
        <WrapTag className="partner-badge">
          <div className="partner-header" onClick={this.onClick.bind(this)}>
            <div className="partner-logo"><img src={this.state.partner.logo} alt={this.state.partner.name} /></div>
            <h2 className="partner-id">{this.state.partner.name}</h2>
            <div className={`partner-type ${this.state.partner.sitetype}`}>{this.state.partner.sitetype}</div>
          </div>
          { EditBtns }
        </WrapTag>
    );
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ editBtn : nextProps.editMode });
    this.setState({ deleteBtn : nextProps.deleteMode });
  }
};

const PartnerBadgeWithRouter = withRouter(PartnerBadge);
export default PartnerBadgeWithRouter;
