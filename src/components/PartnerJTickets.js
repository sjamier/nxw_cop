import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PartnerJTicket from './PartnerJTicket';

class PartnerJTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jiratickets : [],
      newTicket : {
        jiranum : '',
        jiradesc : '',
        jirastatus : '',
      },
      showNewTicketForm : false,
      editMode : false,
      deleteMode : false,
    }
    this.onAddTicket = this.newTicketForm.bind(this);
    this.onNewTicket = this.newTicket.bind(this);
    this.onUpdateStateTicket = this.updateStateTicket.bind(this);

    this.onEditMode = this.editMode.bind(this);
    this.onUpdateTicket = this.updateTicket.bind(this);
    this.onDeleteMode = this.deleteMode.bind(this);
    this.onDeleteTicket = this.deleteTicket.bind(this);
  }

  newTicketForm(e) {
    if (!this.state.showNewTicketForm) { this.setState({ showNewTicketForm : true }); }
    else { this.setState({ showNewTicketForm : false }) }
  }
  editMode() {
    if (!this.state.editMode) { this.setState({ editMode : true }); }
    else { this.setState({ editMode : false }) }
  }
  deleteMode() {
    if (!this.state.deleteMode) { this.setState({ deleteMode : true }); }
    else { this.setState({ deleteMode : false }) }
  }

  newTicket(e) {
    e.preventDefault();
    if (this.state.newTicket.jiranum !== '') {
      // console.log("New Ticket Ticket Added");
      const stateTickets = this.state.jiratickets;
      stateTickets.push(this.state.newTicket);
      this.setState({ jiratickets : stateTickets })
      this.props.onTicketsChange(this.state.jiratickets);
      const stateInit =  { jiradesc : '', jiranum : '', jirastatus : '', };
      this.setState({ showNewTicketForm: false, newTicket : stateInit });
    }
  }
  updateStateTicket(e) {
    const stateObj = this.state.newTicket;
    stateObj[e.target.name] = e.target.value;
    this.setState({ newTicket : stateObj });
  }
  updateTicket(oldTicket, editedTicket) {
    console.log('Search Partner : '+this.state.partnerid+' and record Edited Ticket : '+JSON.stringify(editedTicket));
    console.log('Old Ticket was : '+JSON.stringify(oldTicket));
    const dataSync = [];
    this.state.jiratickets.forEach( ticket => { dataSync.push( ticket === oldTicket ? editedTicket : ticket ) });
    this.setState({ jiratickets : dataSync });
    this.props.onTicketsChange(dataSync);
  }
  deleteTicket(ticketToDelete) {
    console.log('Search Partner : '+this.state.partnerid+' and Delete Ticket key: '+JSON.stringify(ticketToDelete));
    const dataSync = this.state.jiratickets.filter(ticket => ticket.jiradesc !== ticketToDelete.jiradesc);
    this.setState({ jiratickets : dataSync });
    this.props.onTicketsChange(dataSync);
  }

  componentWillMount() {
    if (this.props.jiratickets !== undefined) {
      this.setState({ jiratickets : this.props.jiratickets })
    }
    console.log('Tickets stated : '+this.state.jiratickets);
  }
  render() {
    let partnerJiraTicketsSortedDesc = this.state.jiratickets.sort((a,b) => {
        if (a.jiranum < b.jiranum) return 1;
        if (a.jiranum > b.jiranum) return -1;
        return 0;
      } );
    let partnerJiraTicketsSorted = [];
    partnerJiraTicketsSortedDesc.forEach( ticket => { if (ticket.jirastatus === 'pending') partnerJiraTicketsSorted.push(ticket) });
    partnerJiraTicketsSortedDesc.forEach( ticket => { if (ticket.jirastatus === 'wip') partnerJiraTicketsSorted.push(ticket) });
    partnerJiraTicketsSortedDesc.forEach( ticket => { if (ticket.jirastatus === 'ready') partnerJiraTicketsSorted.push(ticket) });
    partnerJiraTicketsSortedDesc.forEach( ticket => { if (ticket.jirastatus === 'closed') partnerJiraTicketsSorted.push(ticket) });
    const handledStatus = 'pending wip ready closed';
    partnerJiraTicketsSortedDesc.forEach( ticket => { if (handledStatus.indexOf(ticket.jirastatus) === -1) partnerJiraTicketsSorted.push(ticket) });
    let partnerJiraTickets = partnerJiraTicketsSorted.map( (partnerJTicket,idx) => { return(<PartnerJTicket key={idx} jiraticket={partnerJTicket} showEditBtns={this.state.editMode} showDeleteBtns={this.state.deleteMode} onTicketChange={ this.onUpdateTicket } onDeleteTicket={ this.onDeleteTicket }/>); } );
    let AddBtn = <a className={ this.state.showNewTicketForm ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onAddTicket }>+</a>;
    let EditBtn = <a className={ this.state.editMode ? 'btn btn-sign pushed' : 'btn btn-sign' } onClick={ this.onEditMode }>...</a>;
    let DeleteBtn = <a className={ this.state.deleteMode ? 'btn btn-sign lowered-sign pushed' : 'btn btn-sign lowered-sign' } onClick={ this.onDeleteMode }>\<u>*</u>/</a>;
    return (
      <div className="section section-jtickets">
        <div className="header">
          <h3>JIRA Tickets</h3>
          { this.props.location.pathname.indexOf("/admin/") !== -1 ?
            <div className="btn-group">
              { AddBtn }
              { JSON.stringify(this.state.jiratickets) !== "[]" ? EditBtn : null }
              { JSON.stringify(this.state.jiratickets) !== "[]" ? DeleteBtn : null }
            </div>
          : null }
        </div>
        <ul className="jiratickets">
          { this.state.showNewTicketForm ?
            <li className="ticket">
              <form className="newTicket" action="POST" onSubmit={ this.onNewTicket }>
                <input name='jiranum' className="jiranum" type="text" value={ this.state.newTicket.jiranum }  onChange={ this.onUpdateStateTicket } placeholder="Number" />
                <input name='jirastatus' className="jirastatus" type="text" value={ this.state.newTicket.jirastatus }  onChange={ this.onUpdateStateTicket } placeholder="Status" />
                <textarea name='jiradesc' className="jiradesc" value={ this.state.newTicket.jiradesc }  onChange={ this.onUpdateStateTicket } placeholder="Short Description" />
                <input type="submit" value="OK" />
              </form>
            </li> : null }
          { partnerJiraTickets }
        </ul>
      </div>
    );
  }
}

const PartnerJTicketsWithRouter = withRouter(PartnerJTickets);
export default PartnerJTicketsWithRouter;
