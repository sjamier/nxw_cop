import React, { Component } from 'react';

class PartnerUrlPrep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlprep : {
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
        country : this.props.urlprep.country,
        url : this.props.urlprep.url,
      };
      this.setState({ urlprep : currentData, showEditUrlForm : true });
    } else {
      this.setState({ showEditUrlForm : false });
    }
  }
  editUrl(e) {
    e.preventDefault();
    this.setState({ showEditUrlForm : false });
    if (this.state.modified) {
      console.log("URL Edited");
      this.props.onUrlChange(this.props.urlprep, this.state.urlprep);
      this.setState({ modified : false });
    }
  }
  deleteUrlInit(e) {
    console.log('Ready to delete : '+JSON.stringify(this.state.urlprep)+' ?');
    this.props.onDeleteUrl(this.state.urlprep);
  }
  updateStateUrl(e) {
    const stateObj = this.state.urlprep;
    if (stateObj[e.target.name] !== e.target.value) {
      stateObj[e.target.name] = e.target.value;
      this.setState({ urlprep : stateObj, modified : true });
    }
    console.log("urlprep :"+JSON.stringify(this.state.urlprep));
  }

  componentWillMount() {
    const currentData = {
      country : this.props.urlprep.country,
      url : this.props.urlprep.url,
    };
    this.setState({ urlprep : currentData });
  }
  render() {
    let EditBtn = this.props.showEditBtns ? <a className="btn btn-sign" onClick={ this.onEditClick }>{ this.state.showEditUrlForm ? 'x' : '...' }</a> : null;
    let DeleteBtn = this.props.showDeleteBtns ? <a className="btn btn-sign lowered-sign" onClick={ this.onDeleteClick }>X</a> : null;
    return(
      this.state.showEditUrlForm ?
      <li className="urlprep">
        <form className="editUrl" action="POST" onSubmit={ this.onEditUrl }>
          <input name='country' className="country" type="text" value={ this.state.urlprep.country }  onChange={ this.onUpdateStateUrl } placeholder="Country" />
          <input name='url' className="url" type="text" value={ this.state.urlprep.url }  onChange={ this.onUpdateStateUrl } placeholder="PREP Url" />
          <input type="submit" value="OK" />
        </form>
      </li>
    :
      <li className="urlprep">
        <a href={this.props.urlprep.url} target="_blank" rel="noopener noreferrer">
          <div className="country"><span>{this.props.urlprep.country}</span></div>
          <div className="url">{this.props.urlprep.url}</div>
        </a>
        { EditBtn }{ DeleteBtn }
      </li>
    );
  }
}

export default PartnerUrlPrep;
