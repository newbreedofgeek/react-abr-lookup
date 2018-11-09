import React, { Suspense } from 'react';
import SearchResults from './SearchResults';
import renderer from 'react-test-renderer';
import { abn as mockAbnApi } from '../data/mockApi';
import { delay } from './util';

beforeEach(() => {
  fetch.resetMocks()
})

test('SearchResults renders as intended', async done => {
  let mockedRes = mockAbnApi;

  fetch.mockResponseOnce(mockedRes);

  const component = renderer.create(
    <Suspense maxDuration={1000} fallback={<span>loading</span>}>
      <SearchResults
        term={26008672179} 
        type={'abn'} 
        loadingId={26008672179} 
        onResultClick={() => (true)} />
    </Suspense>
  );

  // should be in loading
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // react-test-renderer does not seem to support concurrent Suspense
  // ... but as we mock all we need to do is pull the snapshot out of the current thread to work
  // ... so below should worlk with a delay of 1ms but keeping to 500
  await delay(500);

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  done();
});