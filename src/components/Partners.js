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
          <option value="ALL">ALL</option>
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
  constructor() {
    super();
    this.state = ({
        _partnerTypes : [],
        _partnerTypeFilter : "ALL",
        _partnerNameFilter : "",
    });
  }
  componentWillMount(){
    console.log("this.props.partners : "+this.props.partners);
  }
  componentDidMount(){
  }
  render(){
    this.props.partners.forEach( partner => {
      console.log("partner.sitetype : "+partner.sitetype);
      if (this.state._partnerTypes.indexOf(partner.sitetype) === -1) this.state._partnerTypes.push(partner.sitetype);
    });
    const PartnersBadges = this.props.partners
      .filter( partner => { return this.state._partnerTypeFilter === "ALL" ? partner : partner.sitetype === this.state._partnerTypeFilter; })
      .filter( partner => { return this.state._partnerNameFilter === "" ? partner : partner.name.toLowerCase().includes(this.state._partnerNameFilter.toLowerCase()); })
      .map( partner => { return ( <PartnerBadge key={partner.name} partner={partner} wrapTag="li"/> ); });
    console.log("NbResults: "+PartnersBadges.length+"   - this.state._partnerTypes : "+this.state._partnerTypes);
    return (
      <div id="partners" className="partners">
        <div className="form-components filter-components">
          <h4>Filters</h4>
          <form id="filtersForm" action="GET" onSubmit={(e)=>{e.preventDefault();}}>
            <PartnerTypeSelect onFilterChange={this.onFilterTypeChange.bind(this)} typeOptions={this.state._partnerTypes}/>
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

export default Partners;
