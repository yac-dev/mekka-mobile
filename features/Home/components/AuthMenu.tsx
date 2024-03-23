import React from 'react';
import { View, Text } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { BackgroundColor } from '../../../themes';

type AuthMenu = {
  onEditMyAccountPress: () => void;
  onNotificationSettingPress: () => void;
  onLogoutPress: () => void;
  onDeleteMyAccountPress: () => void;
};

export const AuthMenu: React.FC<AuthMenu> = ({
  onEditMyAccountPress,
  onNotificationSettingPress,
  onLogoutPress,
  onDeleteMyAccountPress,
}) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <AppButton.Cell
        title='Edit my info'
        subTitle='Change your personal information.'
        onButtonPress={onEditMyAccountPress}
      >
        <VectorIcon.MCI name='account' color={BackgroundColor.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
      <AppButton.Cell title='Notification' subTitle='Allowed' onButtonPress={onNotificationSettingPress}>
        <VectorIcon.MCI name='account' color={BackgroundColor.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
      <AppButton.Cell title='Logout' subTitle='Take a break?' onButtonPress={onLogoutPress}>
        <VectorIcon.MCI name='exit-run' color={BackgroundColor.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
      <AppButton.Cell title='Delete my account' subTitle='No regreats?' onButtonPress={onDeleteMyAccountPress}>
        <VectorIcon.MCI name='delete-alert' color={BackgroundColor.white} size={20} style={{ marginRight: 20 }} />
      </AppButton.Cell>
    </View>
  );
};
