import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import Homepage from '/imports/ui/pages/home/Homepage.jsx';
export default () =>(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
  </Router>
)
