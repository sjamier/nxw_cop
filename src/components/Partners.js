import React, { Component } from 'react';
import PartnerBadge from './PartnerBadge';

class PartnerTypeSelect extends Component {
  onChange(e){ this.props.onFilterChange(e.target.value); }
  render(){
    let thisOptions = this.props.typeOptions.map( filterOption => {
      return ( <option key={filterOption} value={filterOption}>{filterOption}</option> )
    });
    return (
      <div className="form-group">
        <select id="partner-filter-type" name="partner-filter-type" onChange={this.onChange.bind(this)}>
          <option value="TYPE">TYPE</option>
          { thisOptions }
        </select>
      </div>
    )
  }
}

class PartnerNameSearchInput extends Component {
  onChange(e){ this.props.onFilterChange(e.target.value); }
  render(){ return( <input type="text" onChange={this.onChange.bind(this)} placeholder="Partner Name Search"/> ) }
}

class Partners extends Component {
  componentWillMount(){
    this.props.partners.forEach( partner => { if (this.props._partnerTypes.indexOf(partner.sitetype) === -1) this.props._partnerTypes.push(partner.sitetype);} );
    this.setState({
      _partnerTypeFilter : "TYPE",
      _partnerNameFilter : null,
    });

  }
  render(){
    const PartnersBadges = this.props.partners
      .filter( partner => { return this.state._partnerTypeFilter === "TYPE" ? partner : partner.sitetype === this.state._partnerTypeFilter; })
      .filter( partner => { return this.state._partnerNameFilter === null ? partner : partner.name.toLowerCase().includes(this.state._partnerNameFilter.toLowerCase()); })
      .map( partner => { return ( <PartnerBadge key={partner.name} partner={partner} wrapTag="li"/> ); });
    console.log("NbResults: "+PartnersBadges.length);
    return (
      <div id="partners" className="partners">
        <div className="form-components filter-components">
          <h4>Filters</h4>
          <form id="filtersForm" action="GET" onSubmit={(e)=>{e.preventDefault();}}>
            <PartnerTypeSelect onFilterChange={this.onFilterTypeChange.bind(this)} typeOptions={this.props._partnerTypes}/>
            <PartnerNameSearchInput onFilterChange={this.onFilterNameChange.bind(this)}/>
          </form>
        </div>
        <ul> { PartnersBadges } </ul>
      </div>
    );
  }

  onFilterTypeChange(newVal){ this.setState({ _partnerTypeFilter : newVal }); }
  onFilterNameChange(newVal){ this.setState({ _partnerNameFilter : newVal }); }
}
Partners.defaultProps = { _partnerTypes : [] };

export default Partners;
