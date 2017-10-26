import {assert} from 'chai';
import { chai } from 'meteor/practicalmeteor:chai';


getLatLng = () =>{
  let coordinate = {
    lat: 0,
    lng: 0
  }
  return coordinate;
}

describe('testing out coordinates', function () {
  it('assert equals test', function () {
    let coordinate = {
      lat: 0,
      lng: 0
    }
    assert.equal(getLatLng().lat, coordinate.lat);
    assert.equal(getLatLng().lng, coordinate.lng);
  });
});
