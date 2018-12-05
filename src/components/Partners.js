import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as firebase from "firebase";
import moment from 'moment';

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
      today : moment(new Date()),
      partners : {},
      partnerTypes : [],
      partnerTypeFilter : "ALL",
      partnerNameFilter : "",
      showNewPartnerForm : false,
      editMode : false,
      deleteMode : false,
      displayAsGrid : false,
      sortAlphabetical : false
    });
    this.partnersFBDB = firebase.database().ref().child('partners');
    this.onEditedPartner = this.onEditedPartner.bind(this);
    this.onDeletedPartner = this.onDeletedPartner.bind(this);
  }

  onEditMode() { this.setState({ editMode : !this.state.editMode }); }
  onDeleteMode() { this.setState({ deleteMode : !this.state.deleteMode }); }

  onFilterTypeChange(newVal) { this.setState({ partnerTypeFilter : newVal }); }
  onFilterNameChange(newVal) { this.setState({ partnerNameFilter : newVal }); }

  displayAs() { this.setState({displayAsGrid: !this.state.displayAsGrid}) }
  sortAs() { this.setState({sortAlphabetical: !this.state.sortAlphabetical}) }

  newPartnerForm(e) { this.setState({showNewPartnerForm: !this.state.showNewPartnerForm}) }

  onAddedPartner(newPartner) {
 //   console.log('newPartner.id :'+newPartner.id+' - newPartner.name :'+newPartner.name+' - newPartner.logo :'+newPartner.logo+' - newPartner.sitetype :'+newPartner.sitetype+' - newPartner.versions.vurl : '+newPartner.versions.vurl+' - newPartner.versions.vstatus :'+newPartner.versions.vstatus);
    newPartner.lastupdate = this.state.today.format("DD.MM.YYYY");
    this.partnersFBDB.push(newPartner);
    this.setState({ showNewPartnerForm : false })
  }

  onEditedPartner(editedPartner) {
//    console.log('about to write updated partner to firebdb : '+JSON.stringify(editedPartner));
    this.props.onDBSyncTrigger(editedPartner, 'edit')
  }

  onDeletedPartner(deletedPartner) {
//    console.log('about to delete partner from firebdb : '+JSON.stringify(deletedPartner));
    this.props.onDBSyncTrigger(deletedPartner, 'delete')
  }

  componentWillMount() {
//    console.log("this.props.partners : "+this.props.partners);
//    console.log("this.props.location : "+JSON.stringify(this.props.location));
    this.setState({ partners : this.props.partners });
  }

  render(){
    this.state.partners.forEach( partner => {
      if (this.state.partnerTypes.indexOf(partner.sitetype) === -1) this.state.partnerTypes.push(partner.sitetype);
    });
    const filteredPartners = this.state.partners
      .filter( partner => { return this.state.partnerTypeFilter === "ALL" ? partner : partner.sitetype === this.state.partnerTypeFilter; })
      .filter( partner => { return this.state.partnerNameFilter === "" ? partner : partner.name.toLowerCase().includes(this.state.partnerNameFilter.toLowerCase()); })
    const filteredPartnersABSorted = [...filteredPartners]
      .sort((a,b) => { return a.name > b.name ? 1 : -1}); 

    const PartnersBadgesRecent = (this.state.sortAlphabetical ? filteredPartnersABSorted : filteredPartners)
      .filter( partner => { return moment(partner.lastupdate,'DD MM YYYY').isAfter(this.state.today.clone().subtract(30,'days')); })
      .map( partner => { return ( <PartnerBadge key={partner.fbdbkey} partner={partner} wrapTag="li" clickable={true} editMode={this.state.editMode} deleteMode={this.state.deleteMode} onEdited={ this.onEditedPartner } onDeleted={ this.onDeletedPartner }/> ); });
    const PartnersBadgesWip = (this.state.sortAlphabetical ? filteredPartnersABSorted : filteredPartners)
      .filter( partner => {
        let isWip = false;
        if ( partner.jiratickets !== undefined ) {
          partner.jiratickets.forEach( jticket => { if (jticket.jirastatus === "wip") isWip = true ;})
        }
        return isWip;
      })
      .map( partner => { return ( <PartnerBadge key={partner.fbdbkey} partner={partner} wrapTag="li" clickable={true} editMode={this.state.editMode} deleteMode={this.state.deleteMode} onEdited={ this.onEditedPartner } onDeleted={ this.onDeletedPartner }/> ); });
    const PartnersBadgesProd = (this.state.sortAlphabetical ? filteredPartnersABSorted : filteredPartners)
      .filter( partner => { return ( partner.urlsprod !== undefined ? true : false);})
      .map( partner => { return ( <PartnerBadge key={partner.fbdbkey} partner={partner} wrapTag="li" clickable={true} editMode={this.state.editMode} deleteMode={this.state.deleteMode} onEdited={ this.onEditedPartner } onDeleted={ this.onDeletedPartner }/> ); });
    const PartnersBadgesAll = (this.state.sortAlphabetical ? filteredPartnersABSorted : filteredPartners)
      .map( partner => { return ( <PartnerBadge key={partner.fbdbkey} partner={partner} wrapTag="li" clickable={true} editMode={this.state.editMode} deleteMode={this.state.deleteMode} onEdited={ this.onEditedPartner } onDeleted={ this.onDeletedPartner }/> ); });
//    console.log("NbResults: "+PartnersBadgesAll.length+"   - this.state.partnerTypes : "+this.state.partnerTypes);

    return (
      <div className="section section-row section-partners">
        <div className="header">
          <h3>Partners</h3>
            { this.props.location.pathname === "/nxw_cop/admin/" &&
              <div className="btn-group">
                <a className={ this.state.showNewPartnerForm ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.newPartnerForm.bind(this) }>+</a>
                <a className={ this.state.editMode ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onEditMode.bind(this) }>...</a>
                <a className={ this.state.deleteMode ? 'btn btn-sign lowered-sign pushed' : 'btn btn-sign lowered-sign' } onClick={ this.onDeleteMode.bind(this) }>\<u>*</u>/</a>
              </div>
            }
            <span className="date">{this.state.today.format('DD.MM.YYYY')}</span>
        </div>
        <div id="partners" className="partners">
          <div className="form-components filter-components">
            <h4>Filters</h4>
            <form id="filtersForm" onSubmit={(e)=>{e.preventDefault();}}>
              <PartnerTypeSelect onFilterChange={this.onFilterTypeChange.bind(this)} typeOptions={this.state.partnerTypes}/>
              <PartnerNameSearchInput onFilterChange={this.onFilterNameChange.bind(this)}/>
            </form>
          </div>
          <div className="displayBtns">
            <a onClick={this.displayAs.bind(this)}>{this.state.displayAsGrid ? 'Display as List' : 'Display as Grid'}</a>
            <a onClick={this.sortAs.bind(this)}>{this.state.sortAlphabetical ? 'Sort by Date Entry' : 'Sort Alphabetically'}</a>
          </div>
          <div className={this.state.displayAsGrid ? 'partners-lists displayAsGrid' : 'partners-lists displayAsList'}>
            <ul className="partners-recent">
              <li className="list-separator">New/Recent Updates (30 days)</li>
              { this.state.showNewPartnerForm && <PartnerAdd onPartnerAdded={ this.onAddedPartner.bind(this) } /> }
              { PartnersBadgesRecent }
            </ul>
            <ul className="partners-progress">
              <li className="list-separator">In Progress</li>
              { PartnersBadgesWip }
            </ul>
            <ul className="partners-production">
              <li className="list-separator">On Production</li>
              { PartnersBadgesProd }
            </ul>
            <ul className="partners-all">
              <li className="list-separator">All Partners</li>
              { PartnersBadgesAll }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
//    console.log("nextProps.partners : "+nextProps.partners);
    this.setState({ partners : nextProps.partners });
  }
}

const PartnersWithRouter = withRouter(Partners);
export default PartnersWithRouter;
