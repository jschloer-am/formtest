import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Form from './Form';
import {loadFormState} from './FormPersist';
import {FormState} from './FormReducer';

interface FormLoaderProps {}

const FormLoader: React.FunctionComponent<FormLoaderProps> = () => {
  //
  const [isLoading, setIsLoading] = useState(true);
  const [initialState, setInitialState] = useState<FormState>({
    units: 'IMPERIAL',
    metric: {height: '0', weight: '0'},
    imperial: {height: {feet: '0', inches: '0'}, weight: '0'},
  });
  useEffect(() => {
    loadFormState().then(val => {
      if (val) {
        setInitialState(val);
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return <Form initialState={initialState} />;
  }
};
export default FormLoader;
