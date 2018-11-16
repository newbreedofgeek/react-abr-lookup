import React from 'react';
import { Spinner } from './Spinner';
import renderer from 'react-test-renderer';

test('Spinner renders as intended', () => {
  const component = renderer.create( <Spinner size="large" /> );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});