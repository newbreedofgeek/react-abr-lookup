import React, { Suspense } from 'react';
import SearchDetail from './SearchDetail';
import renderer from 'react-test-renderer';

beforeEach(() => {
  fetch.resetMocks()
})

test('SearchDetail renders as intended', done => {
  const mockedRes = 'callback({"Abn":"26008672179","AbnStatus":"Active","AddressDate":"2018-02-26","AddressPostcode":"3123","AddressState":"VIC","BusinessName":["Hibberson Street Centre","home@gladesville","Gladesville Homemaker Centre","Bunnings Outdoors","big prawn","G.Y.O.","BUNNINGS TRADE","BUNNINGS TRADE","BATEMANS BAY HOMEMAKER CENTRE","BUNNINGS","BALLINA HOME CENTRE","NARELLAN HOMEMAKER CENTRE","TAREE HOME CENTRE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS HOMEMAKER CENTRE","BUNNINGS SUPA CENTA","DUBBO HOMEMAKER CENTRE","BUNNINGS","BUNNINGS","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","BUNNINGS WAREHOUSE","HARDWARE CAFE","HARDWARE CAFE"],"EntityName":"BUNNINGS GROUP LIMITED","EntityTypeCode":"PUB","EntityTypeName":"Australian Public Company","Gst":"2000-07-01","Message":""})'

  fetch.mockResponseOnce(mockedRes);

  const component = renderer.create(
    <Suspense maxDuration={1000} fallback={<span>loading</span>}>
      <SearchDetail id={26008672179} />
    </Suspense>
  );

  // should be in loading
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // react-test-renderer does not seem to support concurrent Suspense
  // ... but as we mock all we need to do is pull the snapshot out of the current thread to work
  // ... so below should worlk with a delay of 1ms but keeping to 2000
  setTimeout(() => {
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    done();
  }, 2000);
});