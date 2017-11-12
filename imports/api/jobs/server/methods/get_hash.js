import { Meteor } from 'meteor/meteor';

/*
This class will potentially be used to speed up queries by major.
Each major will have its own unique hash, and searching through many jobs'
majors[] arrays to see if they have matching text may take a long time.
Comparing by hash may be faster.

For now just leave it here. - Eric
*/

Meteor.methods({
  getHash:function(inputString){
    var hash = 0;
	  if (inputString.length == 0) return hash;
	  for (i = 0; i < this.length; i++) {
		    var char = this.charCodeAt(i);
		    hash = ((hash<<5)-hash)+char;
		    hash = hash & hash; // Convert to 32bit integer
	  }
  console.log(hash, "Hash for " + inputString);
	return hash;
  }
});
