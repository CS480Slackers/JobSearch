import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory} from 'react-router';
import Homepage from '/imports/ui/pages/home/Homepage.jsx';
import SearchPage from '/imports/ui/pages/search/SearchPage.jsx';
import JobPostPage from '/imports/ui/pages/post/JobPostPage.jsx';
import GoogleMapsPage from '/imports/ui/component/GoogleMap.jsx';
import JobSubmittedPage from '/imports/ui/pages/post/JobSubmittedPage.jsx';
import JobsContainer from '/imports/ui/container/JobsContainer.jsx'

export default () =>(
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
    <Route path="/search" component={SearchPage} />
    {/* <Route path="/map" component={GoogleMapsPage} /> */}
    <Route path="/post" component={JobPostPage} />
    <Route path="/map" component={GoogleMapsPage} />
    <Route path="/submission/:jobId" component={JobSubmittedPage} />
  </Router>
)
