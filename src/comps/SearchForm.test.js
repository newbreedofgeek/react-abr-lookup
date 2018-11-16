import React from 'react';
import { SearchForm } from './SearchForm';
import renderer from 'react-test-renderer';

test('SearchForm renders as intended', () => {
  const component = renderer.create( <SearchForm 
    onResultClick={() => (true)}
    loadingId={null} />);
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});