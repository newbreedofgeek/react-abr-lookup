import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { name as mockNameApi, abn as mockAbnApi } from '../../data/mockApi';
import { delay } from '../common/util';

beforeEach(() => {
  fetch.resetMocks()
})

test('App renders as intended', async done => {
  const component = renderer.create(<App />);
  let mockedRes = '';

  // test root render
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // test a name search
  mockedRes = mockNameApi;

  fetch.mockResponseOnce(mockedRes);

  tree[1].props.onChange({
    target: {
      value: 'bunnings'
    }
  });

  tree[2].props.onClick();

  // should be in loading
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // react-test-renderer does not seem to support concurrent Suspense
  // ... but as we mock all we need to do is pull the snapshot out of the current thread to work
  // ... so below should worlk with a delay of 1ms but keeping to 2000
  await delay(2000);

  // should show search results
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  done();
});