/**
 * @format
 */

import 'react-native';
import React from 'react';
import Form from './Form';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {FormState} from './FormReducer';
import {fireEvent, render} from '@testing-library/react-native';

const defaultState: FormState = {
  imperial: {height: {feet: '0', inches: '0'}, weight: '0'},
  metric: {height: '0', weight: '0'},
  units: 'IMPERIAL',
};

it('renders correctly', () => {
  renderer.create(<Form initialState={defaultState} />);
});
it('Updates text ', () => {
  const {getByTestId, getByA11yLabel} = render(
    <Form initialState={defaultState} />,
  );
  const feet = getByA11yLabel('input ft');
  fireEvent.changeText(feet, '6');
  fireEvent.press(getByTestId('Picker'));
});
