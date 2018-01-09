import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PartnerUrlPrep from './PartnerUrlPrep';

class PartnerUrlsPrep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlsprep : [],
      newUrl : {
        country : '',
        url : '',
      },
      showNewUrlForm : false,
      editMode : false,
      deleteMode : false,
    }
    this.onAddUrl = this.newUrlForm.bind(this);
    this.onNewUrl = this.newUrl.bind(this);
    this.onUpdateStateUrl = this.updateStateUrl.bind(this);

    this.onEditMode = this.editMode.bind(this);
    this.onUpdateUrl = this.updateUrl.bind(this);
    this.onDeleteMode = this.deleteMode.bind(this);
    this.onDeleteUrl = this.deleteUrl.bind(this);
  }

  newUrlForm(e) {
    if (!this.state.showNewUrlForm) { this.setState({ showNewUrlForm : true }); }
    else { this.setState({ showNewUrlForm : false }) }
  }
  editMode() {
    if (!this.state.editMode) { this.setState({ editMode : true }); }
    else { this.setState({ editMode : false }) }
  }
  deleteMode() {
    if (!this.state.deleteMode) { this.setState({ deleteMode : true }); }
    else { this.setState({ deleteMode : false }) }
  }

  newUrl(e) {
    e.preventDefault();
    if ((this.state.newUrl.country !== '') && (this.state.newUrl.url !== '')) {
      // console.log("New url Added");
      const stateUrls = this.state.urlsprep;
      stateUrls.push(this.state.newUrl);
      this.setState({ urlsprep : stateUrls })
      this.props.onUrlsPrepChange(this.state.urlsprep);
      const stateInit =  { country : '', url : '', };
      this.setState({ showNewUrlForm: false, newUrl : stateInit });
    }
  }
  updateStateUrl(e) {
    const stateObj = this.state.newUrl;
    stateObj[e.target.name] = e.target.value;
    this.setState({ newUrl : stateObj });
    console.log('Urls state : '+JSON.stringify(this.state.urlsprep));
    console.log('Url state : '+JSON.stringify(this.state.newUrl));
  }
  updateUrl(oldUrl, editedUrl) {
    console.log('Search Partner : '+this.state.partnerid+' and record Edited url : '+JSON.stringify(editedUrl));
    console.log('Old url was : '+JSON.stringify(oldUrl));
    const dataSync = [];
    this.state.urlsprep.forEach( url => { dataSync.push( url === oldUrl ? editedUrl : url ) });
    this.setState({ urlsprep : dataSync });
    this.props.onUrlsPrepChange(dataSync);
  }
  deleteUrl(urlToDelete) {
    console.log('Search Partner : '+this.state.partnerid+' and Delete url key: '+JSON.stringify(urlToDelete));
    const dataSync = this.state.urlsprep.filter(url => url.country !== urlToDelete.country);
    this.setState({ urlsprep : dataSync });
    this.props.onUrlsPrepChange(dataSync);
  }

  componentWillMount() {
    if (this.props.urlsprep !== undefined) {
      this.setState({ urlsprep : this.props.urlsprep })
    }
  }
  render() {
    let partnerUrlsPrepSorted = this.state.urlsprep.sort((a,b) => {
        if (a.country < b.country) return -1;
        if (a.country > b.country) return 1;
        return 0;
      } );
    let partnerUrlsPrep = partnerUrlsPrepSorted.map( (partnerUrl,idx) => { return (<PartnerUrlPrep key={idx} urlprep={partnerUrl} showEditBtns={this.state.editMode} showDeleteBtns={this.state.deleteMode} onUrlChange={ this.onUpdateUrl } onDeleteUrl={ this.onDeleteUrl }/>); } );
    let AddBtn = <a className={ this.state.showNewUrlForm ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onAddUrl }>+</a>;
    let EditBtn = <a className={ this.state.editMode ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onEditMode }>...</a>;
    let DeleteBtn = <a className={ this.state.deleteMode ? 'btn btn-sign lowered-sign pushed' : 'btn btn-sign lowered-sign' } onClick={ this.onDeleteMode }>\<u>*</u>/</a>;
    let inputContext = "";
    switch(this.props.siteType) {
      case "IAP":
          inputContext = "product";
          break;
      default:
          inputContext = "country";
    }
    return (
      <div className="section section-prepUrls">
        <div className="header">
          <h3>PREP Urls</h3>
          { this.props.location.pathname.indexOf("/admin/") !== -1 ?
            <div className="btn-group">
              { AddBtn }
              { JSON.stringify(this.state.urlsprep) !== "[]" ? EditBtn : null }
              { JSON.stringify(this.state.urlsprep) !== "[]" ? DeleteBtn : null }
            </div>
          : null }
        </div>
        <ul className="urlsprep">
          { this.state.showNewUrlForm ?
            <li className="urlprep">
              <form className="newUrl" action="POST" onSubmit={ this.onNewUrl }>
                <input type='text' name='country' className={inputContext} value={ this.state.newUrl.country }  onChange={ this.onUpdateStateUrl } placeholder={ inputContext === 'country' ? 'Country code' : 'Product name' } />
                <input type='text' name='url' className="url" value={ this.state.newUrl.url }  onChange={ this.onUpdateStateUrl } placeholder="PREP url" />
                <input type="submit" value="OK" />
              </form>
            </li> : null }
          { partnerUrlsPrep }
        </ul>
      </div>
    );
  }
}

const PartnerUrlsPrepWithRouter = withRouter(PartnerUrlsPrep);
export default PartnerUrlsPrepWithRouter;
