// import Nightmare from 'nightmare';
// import { Session } from 'meteor/session'
// // const Nightmare = require('nightmare')
// // Session.set('githubName', 'testing');
// console.log('session name', Session.get('githubName'));
// var nightmare = Nightmare();
// nightmare
//       .goto('https://github.com/roroadodo')
//       .evaluate(() => document.querySelector('.vcard-names').innerText)
//       .end()
//       .then(result => {
//           /*console.log(`The top news story on Hacker News currently is:\n${result}`)*/
//           var names = result.split("\n");
//           console.log(names[1]);
//           // Session.set('githubName', names[1]);
//           // console.log('session name', Session.get('githubName'));
//       })
//       .catch(error => console.error(error))
// // 
