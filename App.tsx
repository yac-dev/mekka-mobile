import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  AuthProvider,
  SnackBarProvider,
  MySpacesProvider,
  SpaceUpdatesProvider,
  CurrentSpaceProvider,
  CurrentTagProvider,
  AppStateProvider,
  GlobalProvider,
  LogsTableProvider,
} from './providers';
import { PaperProvider } from 'react-native-paper';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Composer } from './providers/Providers';
import { Root } from './features/App/pages/Root';

const App: React.FC = function () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
      <Composer
        components={[
          PaperProvider,
          GlobalProvider,
          BottomSheetModalProvider,
          AuthProvider,
          SnackBarProvider,
          MySpacesProvider,
          SpaceUpdatesProvider,
          CurrentSpaceProvider,
          CurrentTagProvider,
          AppStateProvider,
          LogsTableProvider,
        ]}
      >
        <Root />
      </Composer>
    </GestureHandlerRootView>
  );
};

export default App;
