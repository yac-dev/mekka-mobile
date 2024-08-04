import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

type CustomWebViewProps = {
  uri: string;
};

export const CustomWebView: React.FC<CustomWebViewProps> = ({ uri }) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
