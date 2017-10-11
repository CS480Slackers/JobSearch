import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import Homepage from '/imports/ui/pages/home/Homepage.jsx';
import SearchPage from '/imports/ui/pages/home/SearchPage.jsx';
export default () =>(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/search" component={SearchPage} />
  </Router>
)
