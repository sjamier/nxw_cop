import React, { Component } from 'react';
import * as firebase from "firebase";

import PartnerBadge from './PartnerBadge';
import PartnerAdd from './PartnerAdd';

class PartnerTypeSelect extends Component {
  onChange(e) {
    this.props.onFilterChange(e.target.value);
  }
  render(){
    let thisOptions = this.props.typeOptions.map( filterOption => {
      return ( <option key={filterOption} value={filterOption}>{filterOption}</option> )
    });
    return (
      <div className="form-group">
        <select id="partner-filter-type" name="partner-filter-type" onChange={this.onChange.bind(this)}>
          <option value="ALL">ALL</option>
          { thisOptions }
        </select>
      </div>
    )
  }
}

class PartnerNameSearchInput extends Component {
  onChange(e) {
    this.props.onFilterChange(e.target.value);
  }
  render(){
    return( <input type="text" onChange={this.onChange.bind(this)} placeholder="Partner Name Search"/> )
  }
}

class Partners extends Component {
  constructor() {
    super();
    this.state = ({
        partnerTypes : [],
        partnerTypeFilter : "ALL",
        partnerNameFilter : "",
        showNewPartnerForm : false,
        editMode : false,
        deleteMode : false,
    });
    this.partnersFBDB = firebase.database().ref().child('partners');
  }

  onFilterTypeChange(newVal) { this.setState({ partnerTypeFilter : newVal }); }
  onFilterNameChange(newVal) { this.setState({ partnerNameFilter : newVal }); }

  newPartnerForm(e) {
    if (!this.state.showNewPartnerForm) {
      console.log("New Partner Form should display");
      this.setState({ showNewPartnerForm : true });
    } else {
      this.setState({ showNewPartnerForm : false })
    }
  }
  onAddPartner(newPartner) {
    console.log('newPartner.id :'+newPartner.id+' - newPartner.name :'+newPartner.name+' - newPartner.logo :'+newPartner.logo+' - newPartner.sitetype :'+newPartner.sitetype+' - newPartner.versions.vurl : '+newPartner.versions.vurl+' - newPartner.versions.vstatus :'+newPartner.versions.vstatus);
    this.partnersFBDB.push(newPartner);
    this.setState({ showNewPartnerForm : false })
  }
  onEditMode() {
    let currEditMode = this.state.editMode;
    console.log('currEditMode : '+currEditMode);
    this.setState({ editMode : !currEditMode });
  }
  onDeleteMode() {
    this.setState({ deleteMode : this.state.deleteMode ? false : true });
  }

  // componentWillMount() { console.log("this.props.partners : "+this.props.partners); }
  // componentDidMount() {}
  render(){
    this.props.partners.forEach( partner => {
      if (this.state.partnerTypes.indexOf(partner.sitetype) === -1) this.state.partnerTypes.push(partner.sitetype);
    });
    const PartnersBadges = this.props.partners
      .filter( partner => { return this.state.partnerTypeFilter === "ALL" ? partner : partner.sitetype === this.state.partnerTypeFilter; })
      .filter( partner => { return this.state.partnerNameFilter === "" ? partner : partner.name.toLowerCase().includes(this.state.partnerNameFilter.toLowerCase()); })
      .map( partner => { return ( <PartnerBadge key={partner.id} partner={partner} wrapTag="li" clickable={true} editMode={this.state.editMode} deleteMode={this.state.deleteMode} /> ); });
    console.log("NbResults: "+PartnersBadges.length+"   - this.state.partnerTypes : "+this.state.partnerTypes);

    return (
      <div className="section section-row section-partners">
        <div className="header">
          <h3>Partners</h3>
          <div className="btn-group">
            <a className={ this.state.showNewPartnerForm ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.newPartnerForm.bind(this) }>+</a>
            <a className={ this.state.editMode ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onEditMode.bind(this) }>...</a>
            <a className={ this.state.deleteMode ? 'btn btn-sign lowered-sign pushed' : 'btn btn-sign lowered-sign' } onClick={ this.onDeleteMode.bind(this) }>\<u>*</u>/</a>
          </div>
        </div>
        <div id="partners" className="partners">
          <div className="form-components filter-components">
            <h4>Filters</h4>
            <form id="filtersForm" action="POST" onSubmit={(e)=>{e.preventDefault();}}>
              <PartnerTypeSelect onFilterChange={this.onFilterTypeChange.bind(this)} typeOptions={this.state.partnerTypes}/>
              <PartnerNameSearchInput onFilterChange={this.onFilterNameChange.bind(this)}/>
            </form>
          </div>
          <ul>
            { this.state.showNewPartnerForm ? <PartnerAdd onPartnerAdded={ this.onAddPartner.bind(this) } /> : null }
            { PartnersBadges }
          </ul>
        </div>
      </div>
    );
  }
}

export default Partners;
