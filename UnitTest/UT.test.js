import {assert} from 'chai';
import { chai } from 'meteor/practicalmeteor:chai';
import foo from '/imports/api/nightmare/server/methods/test.js';

describe('testing out foo', function () {
  it('assert equals test', function () {
    assert.equal(foo(),5);
  });
  it("another assert equals test",function(){
    assert.equal(foo(),9-4);
  });
});
describe('my module2', function () {
  it('chai methods test', function () {
      chai.expect(2).to.equal(2);
      chai.assert.equal(3,3);

  });
});
