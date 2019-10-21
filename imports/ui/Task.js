import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor'; 

// Task component - represents a single todo item
export default class Eit extends Component {
 toggleChecked(){
    // Set the checked property to the opposite of its current value
  // Eits.update(this.props.eit._id,
  
  Meteor.call('eits.setChecked', this.props.eit._id, !this.props.eit.checked);
  }
  
    // $set: { checked: !this.props.eit.checked },
  // }); 
 
 deleteThisEit(){
 Meteor.call('eits.remove', this.props.eit._id);
   //Eits.remove(this.props.eit._id);
 }
 
  render() {
  const eitClassName = this.props.eit.checked ? 'checked' : '';
    return (
      
   
       
      // <li className={eitClassName} >
       <tr>
        <td> <span>{this.props.index}</span></td>
       
        <td> 
          <input
          type="checkbox"
          readOnly
          checked={!!this.props.eit.checked}
          onClick={this.toggleChecked.bind(this)}
        /></td>


<td> <span className="firstName">{this.props.eit.firstName}</span> </td>
<td> <span className="surname"  >{this.props.eit.surname}</span></td>
<td> <span className="country">{this.props.eit.country}&nbsp;</span></td>
<td>  <span className="age">{this.props.eit.age}&nbsp;</span></td>

 <td>
 <button className="delete" onClick={this.deleteThisEit.bind(this)}>&times; Delete Eit</button>
 <button className="edit" onClick={() => this.props.eitToEdit(this.props.eit)}>Edit</button>
 </td>
     

</tr>
    // </li>
        
    
   
    );
    
    
  }
} 