import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PartnerConnectInfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogs : [],
      territories : [],
      editMode : false,
    }
    this.onEditMode = this.editMode.bind(this);
  }
  editMode() {
    this.setState({ editMode : !this.state.editMode });
  }
  onCatalogClick(e){
    let currentCatalogs = this.state.catalogs;
    if (e.target.classList.contains("activated")) {
      let catIndex = currentCatalogs.indexOf(e.target.innerHTML);
      currentCatalogs.splice(catIndex, 1);
    } else {
      currentCatalogs.push(e.target.innerHTML);
    }
    this.setState({ catalogs : currentCatalogs });
    this.connectInfosUpdate();
  }
  onTerritoryClick(e){
    let currentTerritories = this.state.territories;
    if (e.target.classList.contains("activated")) {
      let terrIndex = currentTerritories.indexOf(e.target.innerHTML);
      currentTerritories.splice(terrIndex, 1);
    } else {
      currentTerritories.push(e.target.innerHTML);
    }
    this.setState({ Territories : currentTerritories });
    this.connectInfosUpdate();
  }

  connectInfosUpdate(){
    let newConnectInfos = {
      catalogs : this.state.catalogs,
      territories : this.state.territories,
    };
    console.log(JSON.stringify(newConnectInfos));
    this.props.onConnectInfosChange(newConnectInfos);
  }
  componentDidMount(){
    if (this.props.connectInfos !== undefined){
      let stateCatalogs =  this.props.connectInfos.catalogs !== undefined ? stateCatalogs = this.props.connectInfos.catalogs : [];
      let stateTerritories =  this.props.connectInfos.territories != undefined ? stateTerritories = this.props.connectInfos.territories : [];
      console.log("stateCatalogs : "+stateCatalogs+"      - stateTerritories : "+stateTerritories);
      this.setState({ catalogs : stateCatalogs, territories: stateTerritories });
    }
  }
  render(){
    let EditBtn = <a className={ this.state.editMode ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onEditMode }>...</a>;

    let catalogsList = this.props.availableCatalogs
      .map( availableCatalog => {
        return( this.state.catalogs.indexOf(availableCatalog) === -1 ?
          this.state.editMode ? <li className="clickable" onClick={ this.onCatalogClick.bind(this) }>{availableCatalog}</li> : null
          :
          this.state.editMode ? <li className="clickable activated" onClick={ this.onCatalogClick.bind(this) }>{availableCatalog}</li> : <li className="activated">{availableCatalog}</li>
        )
      });

    let territoriesList = this.props.availableTerritories
      .map( availableTerritory => {
        return( this.state.territories.indexOf(availableTerritory) === -1 ?
          this.state.editMode ? <li className="clickable" onClick={ this.onTerritoryClick.bind(this) }>{availableTerritory}</li> : null
          :
          this.state.editMode ? <li className="clickable activated" onClick={ this.onTerritoryClick.bind(this) }>{availableTerritory}</li> : <li className="activated">{availableTerritory}</li>
        )
      });

    return(
      <div className='section section-connect'>
        <div className="header">
          <h3>CONNECT Infos</h3>
          { this.props.location.pathname.indexOf("/admin/") !== -1 ? <div className="btn-group">{ EditBtn }</div> : null }
        </div>
        <div className="subsection subsection-catalogs">
          <div className="header">
            <h4>Provided Catalogs</h4>
          </div>
          <ul>
            { catalogsList }
          </ul>
        </div>
        <div className="subsection subsection-territories">
          <div className="header">
            <h4>Territories</h4>
          </div>
          <ul>
            { territoriesList }
          </ul>
        </div>
      </div>
    )
  }
}
PartnerConnectInfos.defaultProps = {
  availableCatalogs : ["Casual Games","Core Games","Softwares"],
  availableTerritories : ["Brazil - BRL - BR", "Europe - EUR - XE", "France - EUR - FR", "Germany - EUR - DE", "Indonesia - IDR - ID", "Italy - EUR - IT", "Japan - JPY - JP", "Malaysia - MYR - MY", "Philippines - PHP - PH", "Portugal - EUR - PT", "Singapore - SGD - SG", "South Korea - KRW - KR", "SouthAmerica - USD - LATAM", "Spain - EUR - ES", "Thailand - THB - TH", "United Kingdom - GBP - GB", "United States - USD - US", "Vietnam - VND - VN"]
}

const PartnerConnectInfosWithRouter = withRouter(PartnerConnectInfos);
export default PartnerConnectInfosWithRouter;
