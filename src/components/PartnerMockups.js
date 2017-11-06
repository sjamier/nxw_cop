import React, { Component } from 'react';
import PartnerMockup from './PartnerMockup';

class PartnerMockups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions : [],
      newVersion : {
        vurl : '',
        vdate : '',
        vstatus : '',
        vcomment : '',
      },
      showNewVersionForm : false,
      editMode : false,
      deleteMode : false,
    }
    this.onAddVersion = this.newVersionForm.bind(this);
    this.onNewVersion = this.newVersion.bind(this);
    this.onUpdateStateVersion = this.updateStateVersion.bind(this);

    this.onEditMode = this.editMode.bind(this);
    this.onUpdateVersion = this.updateVersion.bind(this);
    this.onDeleteMode = this.deleteMode.bind(this);
    this.onDeleteVersion = this.deleteVersion.bind(this);
  }

  newVersionForm(e) {
    if (!this.state.showNewVersionForm) { this.setState({ showNewVersionForm : true }); }
    else { this.setState({ showNewVersionForm : false }) }
  }
  editMode() {
    if (!this.state.editMode) { this.setState({ editMode : true }); }
    else { this.setState({ editMode : false }) }
  }
  deleteMode() {
    if (!this.state.deleteMode) { this.setState({ deleteMode : true }); }
    else { this.setState({ deleteMode : false }) }
  }

  newVersion(e) {
    e.preventDefault();
    if (this.state.newVersion.vdate !== '' && this.state.newVersion.vurl !== '') {
      // console.log("New Mockup Version Added");
      const stateVersions = this.state.versions;
      stateVersions.push(this.state.newVersion);
      this.setState({ versions : stateVersions })
      this.props.onMockupsChange(this.state.versions);
      const stateInit =  { vurl : '', vdate : '', vstatus : '', vcomment : '', };
      this.setState({ showNewVersionForm: false, newVersion : stateInit });
    }
  }
  updateStateVersion(e) {
    const stateObj = this.state.newVersion;
    stateObj[e.target.name] = e.target.value;
    this.setState({ newVersion : stateObj });
  }
  updateVersion(oldVersion, editedVersion) {
    console.log('Search Partner : '+this.state.partnerid+' and record Edited Version : '+JSON.stringify(editedVersion));
    console.log('Old Version was : '+JSON.stringify(oldVersion));
    const dataSync = [];
    this.state.versions.forEach( version => { dataSync.push( version === oldVersion ? editedVersion : version ) });
    this.setState({ versions : dataSync });
    this.props.onMockupsChange(dataSync);
  }
  deleteVersion(versionToDelete) {
    console.log('Search Partner : '+this.state.partnerid+' and Delete Version key: '+JSON.stringify(versionToDelete));
    const dataSync = this.state.versions.filter(version => version.vurl !== versionToDelete.vurl);
    this.setState({ versions : dataSync });
    this.props.onMockupsChange(dataSync);
  }

  componentWillMount() {
    if (this.props.versions !== undefined) {
      this.setState({ versions : this.props.versions })
    }
    console.log('Versions stated : '+this.state.versions);
  }
  render() {
    let partnerMockupVersions_SortByDateDesc = this.state.versions.sort((a,b) => Date.parse(new Date(b.vdate.split(".").reverse().join("-"))) - Date.parse(new Date(a.vdate.split(".").reverse().join("-"))));
    console.log ("partnerMockupVersions_SortByDateDesc : "+partnerMockupVersions_SortByDateDesc.vdate);
    let partnerMockupVersions = partnerMockupVersions_SortByDateDesc
      .map((partnerMockupVersion,idx) => { return(<PartnerMockup key={idx} partnerMockupVersion={partnerMockupVersion} showEditBtns={this.state.editMode} showDeleteBtns={this.state.deleteMode} onVersionChange={ this.onUpdateVersion } onDeleteVersion={ this.onDeleteVersion }/>); }
    );
    let AddBtn = <a className={ this.state.showNewVersionForm ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onAddVersion }>+</a>;
    let EditBtn = <a className={ this.state.editMode ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onEditMode }>...</a>;
    let DeleteBtn = <a className={ this.state.deleteMode ? 'btn btn-sign lowered-sign pushed' : 'btn btn-sign lowered-sign' } onClick={ this.onDeleteMode }>\<u>*</u>/</a>;
    return (
      <div className="section section-mockups">
        <div className="header">
          <h3>Mockups</h3>
          <div className="btn-group">
            { AddBtn }
            { JSON.stringify(this.state.versions) !== "[]" ? EditBtn : null }
            { JSON.stringify(this.state.versions) !== "[]" ? DeleteBtn : null }
          </div>
        </div>
        <ul className="versions">
          { this.state.showNewVersionForm ?
            <li className="version">
              <form className="newVersion" action="POST" onSubmit={ this.onNewVersion }>
                <input name='vdate' className="vdate" type="text" value={ this.state.newVersion.vdate } onChange={ this.onUpdateStateVersion } placeholder="Started Date" />
                <input name='vstatus' className="vstatus" type="text" value={ this.state.newVersion.vstatus }  onChange={ this.onUpdateStateVersion } placeholder="Status" />
                <input name='vurl' className="vurl" type="text" value={ this.state.newVersion.vurl }  onChange={ this.onUpdateStateVersion } placeholder="Url" />
                <textarea name='vcomment' className="vcomment" value={ this.state.newVersion.vcomment }  onChange={ this.onUpdateStateVersion } placeholder="Comment" />
                <input type="submit" value="OK" />
              </form>
            </li> : null }
          { partnerMockupVersions }
        </ul>
      </div>
    );
  }
}

export default PartnerMockups;
