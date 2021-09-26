import * as React from 'react';
import {useReducer} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {ActionTypes, formReducer, FormState} from './FormReducer';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import FormInput from './FormInput';
import {saveFormState} from './FormPersist';
import {Picker} from '@react-native-picker/picker';

interface FormProps {
  initialState: FormState;
}
const Form: React.FunctionComponent<FormProps> = props => {
  const [state, dispatch] = useReducer(formReducer, props.initialState);

  return (
    <View style={styles.formWrapper}>
      <View style={styles.formBody}>
        <SegmentedControl
          values={['Imperial', 'Metric']}
          selectedIndex={state.units === 'IMPERIAL' ? 0 : 1}
          onChange={event => {
            dispatch({
              type: ActionTypes.ChangeUnits,
              payload:
                event.nativeEvent.selectedSegmentIndex === 0
                  ? 'IMPERIAL'
                  : 'METRIC',
            });
          }}
        />
        {state.units === 'METRIC' && (
          <View style={styles.metricSection}>
            <Text>Height</Text>
            <FormInput
              value={state.metric.height}
              onChange={newText => {
                dispatch({
                  type: ActionTypes.ChangeMetricHeight,
                  payload: newText,
                });
              }}
              label="m"
            />
            <Text>Weight</Text>
            <FormInput
              value={state.metric.weight}
              onChange={newText => {
                dispatch({
                  type: ActionTypes.ChangeMetricWeight,
                  payload: newText,
                });
              }}
              label="kg"
            />
          </View>
        )}
        {state.units === 'IMPERIAL' && (
          <View style={styles.imperialSection}>
            <Text>Height</Text>
            <View style={styles.imperialHeightSection}>
              <FormInput
                value={state.imperial.height.feet}
                onChange={newText => {
                  dispatch({
                    type: ActionTypes.ChangeImperialFeet,
                    payload: newText,
                  });
                }}
                label="ft"
              />
              <FormInput
                value={state.imperial.height.inches}
                onChange={newText => {
                  dispatch({
                    type: ActionTypes.ChangeImperialInches,
                    payload: newText,
                  });
                }}
                label="in"
              />
            </View>
            <Text>Weight</Text>
            <FormInput
              value={state.imperial.weight}
              onChange={newText => {
                dispatch({
                  type: ActionTypes.ChangeImperialWeight,
                  payload: newText,
                });
              }}
              label="lbs"
            />
          </View>
        )}
      </View>
      <View style={styles.buttonSection}>
        <Button
          title={'Save'}
          onPress={() => {
            saveFormState(state);
          }}
        />
      </View>
    </View>
  );
};
export default Form;
const styles = StyleSheet.create({
  formWrapper: {
    flexDirection: 'column',
    paddingTop: 8,
  },
  formBody: {flex: 1, flexGrow: 1},
  buttonSection: {},

  imperialHeightSection: {
    flexDirection: 'row',
  },
  imperialSection: {},
  metricSection: {},
});
