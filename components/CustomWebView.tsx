import React, { forwardRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { VectorIcon } from '../Icons';
import { AppButton } from './Button';
import { Colors } from '../themes';

type CustomWebViewProps = {
  uri: string;
  onBackPress: () => void;
  onForwardPress: () => void;
  isBackable: boolean;
  isForwardable: boolean;
  onNavigationStateChange: (navState: WebViewNavigation) => void;
};

type Ref = WebView;

export const CustomWebView = forwardRef<Ref, CustomWebViewProps>(
  ({ uri, onBackPress, onForwardPress, isBackable, isForwardable, onNavigationStateChange }, ref) => {
    return (
      <View style={styles.container}>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={onBackPress} activeOpacity={0.7} disabled={!isBackable}>
            <VectorIcon.II name='arrow-back' size={24} color={isBackable ? 'black' : 'rgb(170,170,170)'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onForwardPress} activeOpacity={0.7} disabled={!isForwardable}>
            <VectorIcon.II name='arrow-forward' size={24} color={isForwardable ? 'black' : 'rgb(170,170,170)'} />
          </TouchableOpacity>
        </View>
        <WebView ref={ref} source={{ uri }} onNavigationStateChange={onNavigationStateChange} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    gap: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
