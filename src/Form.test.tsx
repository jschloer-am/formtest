/**
 * @format
 */

import 'react-native';
import React from 'react';
import Form from './Form';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {FormState} from './FormReducer';
import {fireEvent, render, waitFor} from '@testing-library/react-native';

const defaultState: FormState = {
  imperial: {height: {feet: '0', inches: '0'}, weight: '0'},
  metric: {height: '0', weight: '0'},
  units: 'IMPERIAL',
};

it('renders correctly', () => {
  renderer.create(<Form initialState={defaultState} />);
});
it('Converts values when metric is pushed', async () => {
  const {getByA11yLabel} = render(<Form initialState={defaultState} />);
  //set the height in feet
  const feet = getByA11yLabel('input ft');
  fireEvent.changeText(feet, '6');
  //set the weight
  const pounds = getByA11yLabel('input lbs');
  fireEvent.changeText(pounds, '175');

  //find and press the hidden metric button
  const metricButton = getByA11yLabel('MetricTestButton');
  fireEvent.press(metricButton);
  await waitFor(() => getByA11yLabel('input m'));
  const metricHeight = getByA11yLabel('input m');
  const metricWeight = getByA11yLabel('input kg');

  expect(metricHeight.props.value).toEqual('1.829');
  expect(metricWeight.props.value).toEqual('79.379');
});
