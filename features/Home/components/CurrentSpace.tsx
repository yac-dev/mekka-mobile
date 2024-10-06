import { View, StyleSheet, ScrollView } from 'react-native';
import { Header, Specs, Features, Tags } from '.';

export const CurrentSpace = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 15 }}>
        <Header />
        {/* <Specs /> */}
        {/* <Divider /> */}
        {/* <ScrollView> */}
        <Tags />
        {/* </ScrollView> */}
      </ScrollView>
      <Features />
    </View>
  );
};

const Divider = () => {
  return <View style={styles.divider}></View>;
};

const styles = StyleSheet.create({
  container: {
    // flex: 9,
    flex: 1,
  },
  divider: {
    width: '90%',
    backgroundColor: 'rgb(80,80,80)',
    height: 0.3,
    alignSelf: 'center',
  },
});
