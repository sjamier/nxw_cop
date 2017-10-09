import React, { Component } from 'react';

class PartnerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partner : {
        name : 'blahhh',
        logo : '',
        sitetype : '',
        vurl : '',
        vdate : '',
        vstatus : '',
        vcomment : '',
      }
    }
    this.handleInputType = this.handleInputType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleInputType(e){
    const currentData = this.state.partner;
    currentData[e.target.name] = e.target.value;
    this.setState({ partner : currentData });
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("Recording data for : "+this.state.partner.name);
    let newPartner = {
      id : this.props.partners.length + 1,
      name : this.state.partner.name,
      logo : this.state.partner.logo,
      sitetype : this.state.partner.sitetype,
      versions : [{
        vurl : this.state.partner.vurl,
        vdate : this.state.partner.vdate,
        vstatus : this.state.partner.vstatus,
        vcomment : this.state.partner.vcomment,
      },]
    }
    console.log('newPartner : '+newPartner+' - '+newPartner.name+ ' - '+this.state.partner.name)
    this.props.onPartnerAdded(newPartner);
  };
  render(){
    console.log('Pass HERE ');
    return(
      <div id="partner-breeder">
        <h3>New Onboarding Partner</h3>
        <form action="POST" onSubmit={ this.onSubmit }>
          <input name="name" type="text" placeholder="Name" value={ this.state.partner.name } onChange={ this.handleInputType } />
          <input name="logo" type="text" placeholder="Logo" value={ this.state.partner.logo } onChange={ this.handleInputType } />
          <input name="sitetype" type="text" placeholder="CART, STORE, ..." value={ this.state.partner.sitetype } onChange={ this.handleInputType } />
          <input name="vurl" type="text" placeholder="Mockup Url" value={ this.state.partner.vurl } onChange={ this.handleInputType } />
          <input name="vdate" type="text" placeholder="Date Started" value={ this.state.partner.vdate } onChange={ this.handleInputType } />
          <input name="vstatus" type="text" placeholder="Mockup status: 'ok', 'ko', 'wip', 'ok old'" value={ this.state.partner.vstatus } onChange={ this.handleInputType } />
          <input name="vcomment" type="textarea" placeholder="Comment" value={ this.state.partner.vcomment } onChange={ this.handleInputType } />
          <input type="submit" value="OK"/>
        </form>
      </div>
    );
  }
}

export default PartnerAdd;
