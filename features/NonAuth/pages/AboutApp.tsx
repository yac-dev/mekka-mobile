import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { CustomWebView } from '../../../components';
import { NonAuthStackNavigatorParams } from '../navigations/NonAuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { urls } from '../../../settings';

type IAboutApp = NativeStackScreenProps<NonAuthStackNavigatorParams, 'AboutApp'>;

export const AboutApp: React.FC<IAboutApp> = ({ route }) => {
  const webViewRef = useRef<WebView>(null);
  const [isBackable, setIsBackable] = useState(false);
  const [isForwardable, setIsForwardable] = useState(false);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setIsBackable(navState.canGoBack);
    setIsForwardable(navState.canGoForward);
  };

  const onBackPress = () => {
    webViewRef.current?.goBack();
  };

  const onForwardPress = () => {
    webViewRef.current?.goForward();
  };

  return (
    <CustomWebView
      ref={webViewRef}
      uri={urls.howToCreateNewSpace}
      onBackPress={onBackPress}
      onForwardPress={onForwardPress}
      isBackable={isBackable}
      isForwardable={isForwardable}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};
