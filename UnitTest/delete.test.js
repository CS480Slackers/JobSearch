import {assert} from 'chai';
import { chai } from 'meteor/practicalmeteor:chai';
import '/imports/api/jobs/server/methods/delete_job.js';
describe('testing out delete', function () {
  it('assert delete', function () {
    assert.equal(Meteor.call("jobRemove",{id:"testing"}), 'success');
  });
});
