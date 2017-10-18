import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import JobSubmittedPage from '/imports/ui/pages/post/JobSubmittedPage.jsx';
export default createContainer((props) =>{
  console.log("container props: ", props);
  let test = props.params.jobId;
  console.log("test:", test);
  return {
    test
  };
}, JobSubmittedPage);
