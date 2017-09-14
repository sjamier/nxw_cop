import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import PartnerItem from './PartnerItem';
{/*import PartnersFilters from './PartnersFilters';*/}

var PartnerTypeSelect = createReactClass ({
  getInitialState : () => {
    return {
      partnerType : "ALL"
    }
  },
  handlePartnerType : (e) => {
      console.log(e.target.value);
      this.setState({ partnerType : e.target.value});
      console.log(this.state.partnerType);
  },
  render: () => {
    return(
      <select onChange={this.handlePartnerType}>
        <option value="ALL">ALL</option>
        <option value="CART">CART</option>
        <option value="STORE">STORE</option>
      </select>
    )
  }
});

class Partners extends Component {
  render() {
    console.log('props: ' + this.props);
    console.log('states: ' + this.state);
    if (this.props.partners) {
      let partnerItems = this.props.partners
        .map(partner => {
          return ( <PartnerItem key={partner.name} partner={partner} wrapTag="li"/> );
        });
      return (
        <div className="partners">
          {/*<PartnersFilters partnersData={this.props.partners} />*/}
          <h4>Filters</h4>
          <PartnerTypeSelect />
          <ul>
            {partnerItems}
          </ul>
        </div>
      );
    } else {
      return (<h1>Can't load da sheet !</h1>);
    }
  }
}

export default Partners;
