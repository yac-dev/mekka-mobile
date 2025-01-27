import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';

type AuthMenu = {
  onEditMyAccountPress: () => void;
  onNotificationSettingPress: () => void;
  onLogoutPress: () => void;
  onDeleteMyAccountPress: () => void;
};

const screenHorizontalPadding = 20;

const itemWidth = (Dimensions.get('window').width - screenHorizontalPadding * 2) / 2;

export const AuthMenu: React.FC<AuthMenu> = ({
  onEditMyAccountPress,
  onNotificationSettingPress,
  onLogoutPress,
  onDeleteMyAccountPress,
}) => {
  return (
    // <View style={{ flexDirection: 'column' }}>
    //   <AppButton.Cell
    //     title='Edit my info'
    //     subTitle='Change your personal information.'
    //     onButtonPress={onEditMyAccountPress}
    //     customStyle={{ marginBottom: 10 }}
    //   >
    //     <VectorIcon.MCI name='account' color={Colors.white} size={20} style={{ marginRight: 20 }} />
    //   </AppButton.Cell>
    //   <AppButton.Cell
    //     title='Notification'
    //     subTitle='Allowed'
    //     onButtonPress={onNotificationSettingPress}
    //     customStyle={{ marginBottom: 10 }}
    //   >
    //     <VectorIcon.MI name='notifications-on' color={Colors.white} size={20} style={{ marginRight: 20 }} />
    //   </AppButton.Cell>
    //   <AppButton.Cell
    //     title='Logout'
    //     subTitle='Take a break?'
    //     onButtonPress={onLogoutPress}
    //     customStyle={{ marginBottom: 10 }}
    //   >
    //     <VectorIcon.MCI name='sleep' color={Colors.white} size={20} style={{ marginRight: 20 }} />
    //   </AppButton.Cell>
    //   <AppButton.Cell
    //     title='Delete my account'
    //     subTitle='No regreats?'
    //     onButtonPress={onDeleteMyAccountPress}
    //     customStyle={{ marginBottom: 10 }}
    //   >
    //     <VectorIcon.MCI name='delete-alert' color={Colors.white} size={20} style={{ marginRight: 20 }} />
    //   </AppButton.Cell>
    // </View>
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: 'row' }}
        contentContainerStyle={{
          paddingLeft: screenHorizontalPadding,
          paddingRight: 5,
        }}
      >
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onEditMyAccountPress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MCI name='account' color={Colors.white} size={45} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Edit My Info</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Change your personal information</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onNotificationSettingPress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MI name='notifications-on' color={Colors.white} size={45} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Notification</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Change your notification settings</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onLogoutPress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MCI name='sleep' color={Colors.white} size={45} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Logout</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Take a break?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onDeleteMyAccountPress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MCI name='delete-alert' color={Colors.white} size={45} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>
                Delete My Account
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>No regrets?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
