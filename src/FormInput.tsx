import * as React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

interface FormInputProps {
  value: string;
  onChange: (newText: string) => void;
  label: string;
}
/**
 *  Reusable form input component
 * @param value
 * @param onChange change handler
 * @param label small unit label to be used after input bos
 * @returns
 */
const FormInput: React.FunctionComponent<FormInputProps> = props => {
  const {value, onChange, label} = props;
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
        accessibilityLabel={`input ${label}`}
      />
      <Text style={styles.inputLabel}>{label}</Text>
    </View>
  );
};
export default FormInput;
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingRight: 40,
    width: 140,
  },
});
