import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import AppRouter from '../imports/ui/router';
 
Meteor.startup(() => {
  render(<AppRouter />, document.getElementById('render-target'));
});