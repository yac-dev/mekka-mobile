import React from 'react';
import { View, Text } from 'react-native';
import { EmptyView, AppPressable } from '../../../components';
import { VectorIcon } from '../../../Icons';

export const NoConnection = () => {
  return (
    <EmptyView
      icon={<VectorIcon.FT name='wifi-off' size={48} color='white' style={{ marginBottom: 30 }} />}
      title="You're offline"
      subtitle='Please check your internet connection and try again.'
      action={
        <AppPressable style={{ backgroundColor: 'rgb(70,70,70)', padding: 10, borderRadius: 100, width: 100 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Retry</Text>
        </AppPressable>
      }
    />
  );
};
