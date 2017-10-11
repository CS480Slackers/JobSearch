import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import Homepage from '/imports/ui/pages/home/Homepage.jsx';

import JobPostPage from '/imports/ui/pages/home/JobPostPage.jsx';

export default () =>(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/search" component={SearchPage} />
    <Route path="/post" component={JobPostPage} />
  </Router>
)
