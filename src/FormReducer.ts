import convert from 'convert-units';
export type FormState = {
  units: 'IMPERIAL' | 'METRIC';
  imperial: {
    height: {
      feet: string;
      inches: string;
    };
    weight: string;
  };
  metric: {
    height: string;
    weight: string;
  };
};
// Helper to build out types
type ActionMap<M extends {[index: string]: any}> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  ChangeUnits = 'UNIT_CHANGE',
  ChangeMetricHeight = 'METRIC_HEIGHT_CHANGE',
  ChangeMetricWeight = 'METRIC_WEIGHT_CHANGE',
  ChangeImperialWeight = 'IMPERIAL_WEIGHT_CHANGE',
  ChangeImperialFeet = 'IMPERIAL_FEET_CHANGE',
  ChangeImperialInches = 'IMPERIAL_INCHES_CHANGE',
}

type Payload = {
  [ActionTypes.ChangeUnits]: FormState['units'];
  [ActionTypes.ChangeMetricHeight]: string;
  [ActionTypes.ChangeMetricWeight]: string;
  [ActionTypes.ChangeImperialWeight]: string;
  [ActionTypes.ChangeImperialFeet]: string;
  [ActionTypes.ChangeImperialInches]: string;
};

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];
export const formReducer = (state: FormState, action: Actions): FormState => {
  switch (action.type) {
    case ActionTypes.ChangeUnits:
      // We'll do our conversion here
      // Use the value of the current unit state to calculate the value fo the next state
      if (state.units === 'IMPERIAL') {
        // update the metric value with a stringified version of the imperial value
        return {
          ...state,
          units: action.payload,
          metric: {
            weight: convert(Number.parseFloat(state.imperial.weight))
              .from('lb')
              .to('kg')
              .toFixed(3),
            height: convert(
              Number.parseFloat(state.imperial.height.feet) * 12 +
                Number.parseFloat(state.imperial.height.inches),
            )
              .from('in')
              .to('m')
              .toFixed(3),
          },
        };
      }
      if (state.units === 'METRIC') {
        // update the imperial value with a stringified version of the metric value
        const heightInInches = convert(Number.parseFloat(state.metric.height))
          .from('m')
          .to('in');
        const feet = Math.floor(heightInInches / 12);
        const inches = heightInInches - feet * 12;
        return {
          ...state,
          units: action.payload,
          imperial: {
            weight: convert(Number.parseFloat(state.metric.weight))
              .from('kg')
              .to('lb')
              .toFixed(0),
            height: {feet: feet.toFixed(0), inches: inches.toFixed(0)},
          },
        };
      }
      return {
        ...state,
        units: action.payload,
      };
    case ActionTypes.ChangeMetricHeight:
      return {...state, metric: {...state.metric, height: action.payload}};
    case ActionTypes.ChangeMetricWeight:
      return {...state, metric: {...state.metric, weight: action.payload}};
    case ActionTypes.ChangeImperialWeight:
      return {...state, imperial: {...state.imperial, weight: action.payload}};
    case ActionTypes.ChangeImperialFeet:
      return {
        ...state,
        imperial: {
          ...state.imperial,
          height: {...state.imperial.height, feet: action.payload},
        },
      };
    case ActionTypes.ChangeImperialInches:
      return {
        ...state,
        imperial: {
          ...state.imperial,
          height: {...state.imperial.height, inches: action.payload},
        },
      };
    default:
      return state;
  }
};
