import React from 'react';
import createReactClass from 'create-react-class';
import PartnerItem from './PartnerItem';
{/*import PartnersFilters from './PartnersFilters';*/}

const PartnerTypeSelect = createReactClass ({
  onChange(e){
    console.log(e.target.value);
    this.props.onFilterChange(e.target.value);
  },

  render(){
    return(
      <select id="partner-filter-type" onChange={this.onChange}>
        <option value="ALL">ALL</option>
        <option value="CART">CART</option>
        <option value="STORE">STORE</option>
      </select>
    )
  },
});

const PartnerNameSearchInput = createReactClass({
  onChange(e){
    console.log(e.target.value);
    this.props.onFilterChange(e.target.value);
  },
  render(){
    return(
      <input type="text" onChange={this.onChange} placeholder="Partner Name Search"/>
    )
  },
});

const Partners = createReactClass ({
  getInitialState(){
    return {
      _partnerTypeFilter : "ALL",
      _partnerNameFilter : null
    }
  },

  render(){
    if (this.props.partners) {
      let partnerItems = this.props.partners
        .filter( partner => {
          return this.state._partnerTypeFilter === "ALL" ? partner : partner.sitetype === this.state._partnerTypeFilter;
        })
        .filter( partner => {
          return this.state._partnerNameFilter === null ? partner : partner.name.toLowerCase().includes(this.state._partnerNameFilter.toLowerCase());
        })
        .map( partner => {
          return ( <PartnerItem key={partner.name} partner={partner} wrapTag="li" onBadgeClick={this.goToPartnerProfile}/> );
        });
      return (
        <div className="partners">
          {/*<PartnersFilters partnersData={this.props.partners} />*/}
          <h4>Filters</h4>
          <PartnerTypeSelect onFilterChange={this.onFilterTypeChange}/>
          <PartnerNameSearchInput onFilterChange={this.onFilterNameChange}/>
          <ul>
            {partnerItems}
          </ul>
        </div>
      );
    } else {
      return (<h1>Can't load da sheet !</h1>);
    }
  },

  onFilterTypeChange(newVal){ this.setState({ _partnerTypeFilter : newVal }); },
  onFilterNameChange(newVal){ this.setState({ _partnerNameFilter : newVal }); },
  goToPartnerProfile(partner){ console.log("Going to "+partner.name+" profile"); },
});

export default Partners;
