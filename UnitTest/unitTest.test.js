import {assert} from 'chai';
import { chai } from 'meteor/practicalmeteor:chai';


export default function getLatLng(){
  let coordinate = {
    lat: 0,
    lng: 0
  }
  return coordinate;
}

describe('testing out foo', function () {
  it('assert equals test', function () {
    let coordinate = {
      lat: 0,
      lng: 0
    }
    assert.equal(getLatLng(), coordinate);
  });
