import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';
import {Eits} from '../api/eits.js'; 
import Eit from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
// App component - represents the whole app
 class App extends Component {

  state = {
    eitToEdit: {},
    isEditting: false,
    firstName: '',
    surname: '',
    country: '',
    age: ''
  }
 
  //constructor(props) {
   // super(props);
   // this.handleSubmit = this.handleSubmit.bind(this);
 //}   

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    // const firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
    // const surname = ReactDOM.findDOMNode(this.refs.surname).value.trim();
    // const country = ReactDOM.findDOMNode(this.refs.country).value.trim();
    // const age = ReactDOM.findDOMNode(this.refs.age).value.trim();

    const { firstName, surname, country, age } = this.state;
 
    if(this.state.isEditting) {
      // Eits.update(this.state.eitToEdit._id, {
      //   $set: {
      //     firstName: firstName,
      //     surname: surname,
      //     country: country,
      //     age: age
      //   }
      // });
      Meteor.call('eits.update', this.state.eitToEdit._id, firstName,surname,country,age);

      this.setState({
        eitToEdit: {},
        firstName: '',
        surname: '',
        country: '',
        age: '',
        isEditting: false
      });
    } else {
      Meteor.call('eits.insert', firstName,surname,country,age);
      
      // Eits.insert({
      //   firstName,
      //   surname,
      //   country,
      //   age,
      //   createdAt: new Date(), // current time
      //   owner: Meteor.userId(), //id of logged in user
      //   username: Meteor.user().username, //username of logged in user
      // });
      //clear form

      this.setState({
        eitToEdit: {},
        firstName: '',
        surname: '',
        country: '',
        age: '',
       
      });
  
    }
    
 
    // Clear form
    // ReactDOM.findDOMNode(this.refs.firstName).value = '';
    // ReactDOM.findDOMNode(this.refs.surname).value = '';
    // ReactDOM.findDOMNode(this.refs.country).value = '';
    // ReactDOM.findDOMNode(this.refs.age).value = '';
  }
 
  eitToEdit(eit) {
    this.setState({
      eitToEdit: eit,
      firstName: eit.firstName,
      surname: eit.surname,
      country: eit.country,
      age: eit.age,
      isEditting: true
    });
  }

  renderEits() {
  
    return this.props.eits.map((eit, index) => (
      <Eit key={index} index={index+1} eit={eit} eitToEdit={this.eitToEdit.bind(this)} />
     ));
     }
 
  render() {
    //const eitClassName = this.props.eit.checked ? 'checked' : '';
    return (
        <div className="row">
      
        <header>
          <h1>Mest EITs Managment System</h1>
          <AccountsUIWrapper/>
          </header>
          <br></br><br></br>

        
         { this.props.currentUser ?
      
         
          <form  onSubmit={this.handleSubmit.bind(this)} >
          <label htmlFor="firstname">First Name :</label>{' '}
          <input
              type="text"
              ref="firstName"
              placeholder="Eits First Name"
              value={this.state.firstName}
              required
              onChange={e => this.setState({ firstName: e.target.value })}
           />{' '}
            <label htmlFor="surname">Surname :</label>{' '}
           <input
              type="text"
              ref="surname"
              placeholder="Eits Surname"
              value={this.state.surname}
              required
              onChange={e => this.setState({ surname: e.target.value })}
           />{' '}
            <label htmlFor="Country">Country :</label>{' '}
           <input
              type="text"
              ref="country"
              placeholder="Country"
              value={this.state.country}
              required
              onChange={e => this.setState({ country: e.target.value })}
           />{' '}
            <label htmlFor="Age">Eit's Age :</label>{' '}
           <input
              type="text"
              ref="age"
              placeholder="Eits Age"
              value={this.state.age}
              required
              onChange={e => this.setState({ age: e.target.value })}
           />{' '}
           <button type="submit">{this.state.isEditting ? 'Edit EIT' : 'Add EIT'}</button>
          
            </form> : ''
         }
<br></br>
         <br></br>
               
               <ul>
         <table cellSpacing={"0"}>
           <tbody>
           {this.renderEits()}
           </tbody>
        </table> 
        </ul>
              
            
 
      <br></br><br></br>
        <button onClick={e => {
          Meteor.call('eits.remove_bulk');
        }}>Delete Selected Eits</button>
      </div>
      
    );
    
  }
  
     
}

export default withTracker(() => {
  return {
    eits: Eits.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
})(App);