import React from 'react';
import { View, Text } from 'react-native';
import { EmptyView, AppPressable } from '../../../components';

export const NoConnection = () => {
  return (
    <EmptyView
      title='🤨 No internet connection...'
      action={
        <View>
          <AppPressable style={{ backgroundColor: 'rgb(70,70,70)', padding: 10, borderRadius: 100 }}>
            <Text style={{ color: 'white' }}>Retry</Text>
          </AppPressable>
        </View>
      }
    />
  );
};
