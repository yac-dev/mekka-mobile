import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SnackBarProvider } from './providers';
import { PaperProvider } from 'react-native-paper';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Composer } from './providers/Providers';
import { Root } from './features/App/pages/Root';
import FlashMessage from 'react-native-flash-message';
import { RecoilRoot } from 'recoil';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar hidden={false} translucent={true} backgroundColor='blue' barStyle='light-content' />
          <Composer components={[PaperProvider, BottomSheetModalProvider, SnackBarProvider]}>
            <Root />
          </Composer>
          <FlashMessage />
        </GestureHandlerRootView>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
