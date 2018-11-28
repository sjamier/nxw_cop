import React, { Component } from 'react';

class PartnerTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList : ["pending", "wip", "ready", "closed"],
      ticket : {
        jiranum : '',
        jiradesc : '',
        jirastatus : '',
      },
      showEditBtns : this.props.showEditBtns,
      showEditTicketForm : false,
      modified : false,
    }
    this.onEditClick = this.editTicketForm.bind(this);
    this.onEditTicket = this.editTicket.bind(this);
    this.onDeleteClick = this.deleteTicketInit.bind(this);
    this.onUpdateStateTicket = this.updateStateTicket.bind(this);
  }
  editTicketForm(e) {
    if (!this.state.showEditTicketForm) {
      console.log("Pre-filled Edit JIRA Ticket Form should display - JiraStatus : "+this.props.jiraticket.jirastatus);
      const currentData = {
        jiranum : this.props.jiraticket.jiranum,
        jiradesc : this.props.jiraticket.jiradesc,
        jirastatus : this.props.jiraticket.jirastatus,
      };
      this.setState({ ticket : currentData, showEditTicketForm : true });
    } else {
      this.setState({ showEditTicketForm : false });
    }
    console.log("state.jirastatus : "+this.state.ticket.jirastatus);
  }
  editTicket(e) {
    e.preventDefault();
    this.setState({ showEditTicketForm : false });
    if (this.state.modified) {
      console.log("Jira Ticket Edited");
      this.props.onTicketChange(this.props.jiraticket, this.state.ticket);
      this.setState({ modified : false });
    }
  }
  deleteTicketInit(e) {
    console.log('Ready to delete : '+JSON.stringify(this.state.ticket)+' ?');
    this.props.onDeleteTicket(this.state.ticket);
  }
  updateStateTicket(e) {
    const stateObj = this.state.ticket;
    if (stateObj[e.target.name] !== e.target.value) {
      stateObj[e.target.name] = e.target.value;
      this.setState({ ticket : stateObj, modified : true });
    }
  }

  componentWillMount() {
    const currentData = {
      jiranum : this.props.jiraticket.jiranum,
      jiradesc : this.props.jiraticket.jiradesc,
      jirastatus : this.props.jiraticket.jirastatus,
    };
    this.setState({ ticket : currentData });
  }
  render() {
    const statusListOptions = this.state.statusList.map( status => { return( <option key={status} value={status}>{status}</option> ) });
    return(
      this.state.showEditTicketForm ?
      <li className="ticket">
        <form className="editTicket" action="POST" onSubmit={ this.onEditTicket }>
          <input name='jiranum' className="jiranum" type="text" value={ this.state.ticket.jiranum }  onChange={ this.onUpdateStateTicket } placeholder="Number" />
          <select name='jirastatus' className="jirastatus" value={ this.state.ticket.jirastatus }  onChange={ this.onUpdateStateTicket }>
            {statusListOptions}
          </select>
          <input name='jiradesc' className="jiradesc" type="text" value={ this.state.ticket.jiradesc }  onChange={ this.onUpdateStateTicket } placeholder="Short Description" />
          <input type="submit" value="OK" />
        </form>
      </li>
    :
      <li className="ticket">
        <a href={`https://nxwjira.nexway.com/browse/${this.props.jiraticket.jiranum}`} target="_blank" rel="noopener noreferrer">
          <div className="jira-number"><span>{this.props.jiraticket.jiranum}</span></div>
            { (this.props.jiraticket.jiradesc !== "") && <div className="jira-desc"><span>{this.props.jiraticket.jiradesc}</span></div> }
          <div className={`jira-status ${this.props.jiraticket.jirastatus}`}></div>
        </a>
        { this.props.showEditBtns && <a className="btn btn-sign" onClick={ this.onEditClick }>...</a> }
        { this.props.showDeleteBtns && <a className="btn btn-sign lowered-sign" onClick={ this.onDeleteClick }>X</a> }
      </li>
    );
  }
}

export default PartnerTicket;
