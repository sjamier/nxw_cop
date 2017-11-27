import React, { Component } from 'react';

class PartnerMockup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version : {
        vurl : '',
        vdate : '',
        vstatus : '',
        vcomment : '',
      },
      showEditBtns : this.props.showEditBtns,
      showEditVersionForm : false,
      modified : false,
    }
    this.onEditClick = this.editVersionForm.bind(this);
    this.onEditVersion = this.editVersion.bind(this);
    this.onDeleteClick = this.deleteVersionInit.bind(this);
    this.onUpdateStateVersion = this.updateStateVersion.bind(this);
  }
  editVersionForm(e) {
    if (!this.state.showEditVersionForm) {
      console.log("Pre-filled Edit Mockup Version Form should display");
      const currentData = {
        vurl : this.props.partnerMockupVersion.vurl,
        vdate : this.props.partnerMockupVersion.vdate,
        vstatus : this.props.partnerMockupVersion.vstatus,
        vcomment : this.props.partnerMockupVersion.vcomment,
      };
      this.setState({ version : currentData,
                      showEditVersionForm : true });
    } else {
      this.setState({ showEditVersionForm : false });
    }
  }
  editVersion(e) {
    e.preventDefault();
    this.setState({ showEditVersionForm : false });
    if (this.state.modified) {
      console.log("Mockup Version Edited");
      this.props.onVersionChange(this.props.partnerMockupVersion, this.state.version);
      this.setState({ modified : false });
    }
  }
  deleteVersionInit(e) {
    console.log('Ready to delete : '+JSON.stringify(this.state.version)+' ?');
    this.props.onDeleteVersion(this.state.version);
  }
  updateStateVersion(e) {
    const stateObj = this.state.version;
    if (stateObj[e.target.name] !== e.target.value) {
      stateObj[e.target.name] = e.target.value;
      this.setState({ version : stateObj, modified : true });
    }
  }

  componentWillMount() {
    const currentData = {
      vurl : this.props.partnerMockupVersion.vurl,
      vdate : this.props.partnerMockupVersion.vdate,
      vstatus : this.props.partnerMockupVersion.vstatus,
      vcomment : this.props.partnerMockupVersion.vcomment,
    };
    this.setState({ version : currentData });
  }
  render() {
    let Comment = this.props.partnerMockupVersion.vcomment !== "" ? <div className="version-comment"><span>{this.props.partnerMockupVersion.vcomment}</span></div> : '';
    let EditBtn = this.props.showEditBtns ? <a className="btn btn-sign" onClick={ this.onEditClick }>{ this.state.showEditVersionForm ? 'x' : '...' }</a> : null;
    let DeleteBtn = this.props.showDeleteBtns ? <a className="btn btn-sign lowered-sign" onClick={ this.onDeleteClick }>X</a> : null;
    // console.log('state.showEditBtns : '+this.state.showEditBtns+'   - EditBtns : '+EditBtn);
    // console.log('state.showDeleteBtns : '+this.state.showDeleteBtns+'   - DeleteBtns : '+DeleteBtn);
    return(
      this.state.showEditVersionForm ?
      <li className="version">
        <form className="editVersion" action="POST" onSubmit={ this.onEditVersion }>
          <input name='vdate' className="vdate" type="text" value={ this.state.version.vdate } onChange={ this.onUpdateStateVersion } placeholder="Started Date" />
          <input name='vstatus' className="vstatus" type="text" value={ this.state.version.vstatus }  onChange={ this.onUpdateStateVersion } placeholder="Status" />
          <input name='vurl' className="vurl" type="text" value={ this.state.version.vurl }  onChange={ this.onUpdateStateVersion } placeholder="Url" />
          <textarea name='vcomment' className="vcomment" value={ this.state.version.vcomment }  onChange={ this.onUpdateStateVersion } placeholder="Comment" />
          <input type="submit" value="OK" />
        </form>
      </li>
    :
      <li className="version">
        <a href={`${this.props.partnerMockupVersion.vurl}`} target="_blank" rel="noopener noreferrer">
          <div className="version-date"><span>{this.props.partnerMockupVersion.vdate}</span></div>
          { Comment }
          <div className={`version-status ${this.props.partnerMockupVersion.vstatus}`}></div>
        </a>
        { EditBtn }{ DeleteBtn }
      </li>
    );
  }
}

export default PartnerMockup;
