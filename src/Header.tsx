import * as React from 'react';
import {View, StyleSheet, Image} from 'react-native';

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <View style={styles.headerView}>
      <Image source={require('./images/passio_logo.png')} />
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#222529',
    padding: 30,
    alignItems: 'center',
  },
});
