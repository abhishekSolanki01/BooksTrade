import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import {routes} from '../imports/routes/routes'
import { Tracker } from 'meteor/tracker';


Meteor.startup(() => {
  render(routes, document.getElementById('react-target'));
});