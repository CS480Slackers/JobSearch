
const Nightmare = require('nightmare')

Nightmare()
      .goto('https://github.com/roroadodo')
      .evaluate(() => document.querySelector('.vcard-names').innerText)
      .end()
      .then(result => {
          /*console.log(`The top news story on Hacker News currently is:\n${result}`)*/
          var names = result.split("\n");
          console.log(names[1]);
      })
      .catch(error => console.error(error))
