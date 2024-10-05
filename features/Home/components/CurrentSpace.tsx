import { View, StyleSheet, ScrollView } from 'react-native';
import { Header, Specs, Features, Tags } from '.';

export const CurrentSpace = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* <Specs /> */}
      {/* <Divider /> */}
      {/* <ScrollView> */}
      <Features />
      <Tags />
      {/* </ScrollView> */}
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 9,
  },
  divider: {
    width: '90%',
    backgroundColor: 'rgb(80,80,80)',
    height: 0.3,
    alignSelf: 'center',
  },
});
