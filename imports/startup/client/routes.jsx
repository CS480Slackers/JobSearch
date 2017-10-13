import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import Homepage from '/imports/ui/pages/home/Homepage.jsx';
import SearchPage from '/imports/ui/pages/home/SearchPage.jsx';
import JobPostPage from '/imports/ui/pages/home/JobPostPage.jsx';
import GoogleMapsPage from '/imports/ui/pages/home/GoogleMapsPage.jsx';

export default () =>(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/search" component={GoogleMapsPage} />
    <Route path="/post" component={JobPostPage} />
    <Route path="/map" component={GoogleMapsPage} />
  </Router>
)
