import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import routes from './routes.jsx';
import '/imports/stylesheet/home.css';
// import '/imports/ui/stylesheet/stylesheet.css';

Meteor.startup(() => {
  render(routes(), document.getElementById('app'));
});
