import React, { Component } from 'react';

class PartnerUrlProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlprod : {
        country : '',
        url : '',
      },
      showEditBtns : this.props.showEditBtns,
      showEditUrlForm : false,
      modified : false,
    }
    this.onEditClick = this.editUrlForm.bind(this);
    this.onEditUrl = this.editUrl.bind(this);
    this.onDeleteClick = this.deleteUrlInit.bind(this);
    this.onUpdateStateUrl = this.updateStateUrl.bind(this);
  }
  editUrlForm(e) {
    if (!this.state.showEditUrlForm) {
      console.log("Pre-filled Edit URL Form should display");
      const currentData = {
        country : this.props.urlprod.country,
        url : this.props.urlprod.url,
      };
      this.setState({ urlprod : currentData, showEditUrlForm : true });
    } else {
      this.setState({ showEditUrlForm : false });
    }
  }
  editUrl(e) {
    e.preventDefault();
    this.setState({ showEditUrlForm : false });
    if (this.state.modified) {
      console.log("URL Edited");
      this.props.onUrlChange(this.props.urlprod, this.state.urlprod);
      this.setState({ modified : false });
    }
  }
  deleteUrlInit(e) {
    console.log('Ready to delete : '+JSON.stringify(this.state.urlprod)+' ?');
    this.props.onDeleteUrl(this.state.urlprod);
  }
  updateStateUrl(e) {
    const stateObj = this.state.urlprod;
    if (stateObj[e.target.name] !== e.target.value) {
      stateObj[e.target.name] = e.target.value;
      this.setState({ urlprod : stateObj, modified : true });
    }
    console.log("urlprod :"+JSON.stringify(this.state.urlprod));
  }

  componentWillMount() {
    const currentData = {
      country : this.props.urlprod.country,
      url : this.props.urlprod.url,
    };
    this.setState({ urlprod : currentData });
  }
  render() {
    let EditBtn = this.props.showEditBtns ? <a className="btn btn-sign" onClick={ this.onEditClick }>{ this.state.showEditUrlForm ? 'x' : '...' }</a> : null;
    let DeleteBtn = this.props.showDeleteBtns ? <a className="btn btn-sign lowered-sign" onClick={ this.onDeleteClick }>X</a> : null;
    return(
      this.state.showEditUrlForm ?
      <li className="urlprod">
        <form className="editUrl" action="POST" onSubmit={ this.onEditUrl }>
          <input name='country' className="country" type="text" value={ this.state.urlprod.country }  onChange={ this.onUpdateStateUrl } placeholder="Country" />
          <input name='url' className="url" type="text" value={ this.state.urlprod.url }  onChange={ this.onUpdateStateUrl } placeholder="PREP Url" />
          <input type="submit" value="OK" />
        </form>
      </li>
    :
      <li className="urlprod">
        <a href={this.props.urlprod.url} target="_blank" rel="noopener noreferrer">
          <div className="country"><span>{this.props.urlprod.country}</span></div>
          <div className="url">{this.props.urlprod.url}</div>
        </a>
        { EditBtn }{ DeleteBtn }
      </li>
    );
  }
}

export default PartnerUrlProd;
