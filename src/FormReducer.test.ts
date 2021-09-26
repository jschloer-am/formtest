import {ActionTypes, formReducer, FormState} from './FormReducer';

const defaultState: FormState = {
  imperial: {height: {feet: '0', inches: '0'}, weight: '0'},
  metric: {height: '0', weight: '0'},
  units: 'IMPERIAL',
};
describe('reducer tests', () => {
  test('Change Units action recalculates from metric to imperial', () => {
    const state: FormState = {
      ...defaultState,
      units: 'METRIC',
      metric: {height: '3', weight: '50'},
    };
    const newState = formReducer(state, {
      type: ActionTypes.ChangeUnits,
      payload: 'IMPERIAL',
    });

    expect(newState.units).toEqual('IMPERIAL');
    expect(newState.imperial.height.feet).toEqual('9');
    expect(newState.imperial.height.inches).toEqual('10');
    expect(newState.imperial.weight).toEqual('110');
  });

  test('Change Units action recalculates from imperial to metric', () => {
    const state: FormState = {
      ...defaultState,
      units: 'IMPERIAL',
      imperial: {height: {feet: '6', inches: '0'}, weight: '175'},
    };
    const newState = formReducer(state, {
      type: ActionTypes.ChangeUnits,
      payload: 'IMPERIAL',
    });

    expect(newState.metric.height).toEqual('1.829');
    expect(newState.metric.weight).toEqual('79.379');
  });
});
