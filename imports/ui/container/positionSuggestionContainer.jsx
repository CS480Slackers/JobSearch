import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import SearchPage from '/imports/ui/pages/search/SearchPage.jsx';
import { Positions } from '/imports/api/jobs/positions.js';
export default createContainer((props) =>{
  const positionSub = Meteor.subscribe('all_position');
  let selector = {};
  const allPosition = Positions.find(selector).fetch();
  // console.log('allPosition',allPosition );

  return {
    allPosition: allPosition,
    loading: !positionSub.ready()
  };
}, SearchPage);
