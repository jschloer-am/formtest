import AsyncStorage from '@react-native-async-storage/async-storage';
import {FormState} from './FormReducer';

export const loadFormState = async (): Promise<FormState | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@form_state');
    return jsonValue != null ? (JSON.parse(jsonValue) as FormState) : null;
  } catch (e) {
    // error reading value
  }
  return null;
};
export const saveFormState = async (value: FormState) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@form_state', jsonValue);
  } catch (e) {
    // error reading value
  }
};
