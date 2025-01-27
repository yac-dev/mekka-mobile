import React from 'react';
import { View, Text, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { urls } from '../../../settings';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../../../navigations';
import { AppButton } from '../../../components';

const actionButtonContainerWidth = (Dimensions.get('screen').width - 40 - 16) / 3;
const actionButtonWidth = actionButtonContainerWidth * 0.8;

type NoSpacesProps = {
  openAuthMenuBottomSheet: (index: number) => void;
  openAppBlogWebviewBottomSheet: (index: number) => void;
};

export const NoSpaces: React.FC<NoSpacesProps> = ({ openAuthMenuBottomSheet, openAppBlogWebviewBottomSheet }) => {
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  // webviewにしたいんだわな。。。linkingはやめよう、appから離れてしまう。。。
  const openLink = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 30, alignItems: 'flex-end', paddingRight: 10 }}>
        <AppButton.Icon
          onButtonPress={() => openAuthMenuBottomSheet(0)}
          customStyle={{
            width: 45,
            aspectRatio: 1,
            backgroundColor: 'rgb(50,50,50)',
          }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='account' size={20} color={Colors.white} />
        </AppButton.Icon>
      </View>

      <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>
          You haven't joined any spaces now
        </Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>Let's get started down below.</Text>
        <View style={{ marginTop: 50, gap: 8, flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: actionButtonContainerWidth,
              aspectRatio: 1,
              padding: 10,
            }}
            // onPress={() => console.log('hello')}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                width: actionButtonWidth,
                aspectRatio: 1,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                homeStackNavigation.navigate('CreateNewSpaceStackNavigator');
              }}
              // ここのnavigationがおかしいね。enterprivateも。discoverは大丈夫そう。
              // あとは、spaceが無からアリになった時用な。
            >
              <VectorIcon.MCI name='rocket-launch' color={Colors.white} size={30} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => openAppBlogWebviewBottomSheet(1)}>
              <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Create new
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: 'white',
                  borderBottomWidth: 0.3,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '700',
                    marginRight: 5,
                  }}
                >
                  space
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: actionButtonContainerWidth,
              aspectRatio: 1,
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                width: actionButtonWidth,
                aspectRatio: 1,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => homeStackNavigation.navigate('AboutApp', { url: urls.howToCreateNewSpace })}
            >
              <VectorIcon.II name='key' color={Colors.white} size={40} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => openLink(urls.howToCreateNewSpace)}>
              <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Join private
                </Text>
              </View>
              <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  space
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            // activeOpacity={0.5}
            style={{
              width: actionButtonContainerWidth,
              aspectRatio: 1,
              padding: 10,
            }}
            // onPress={() => console.log('hello')}
          >
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 100,
                width: actionButtonWidth,
                aspectRatio: 1,
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => homeStackNavigation.navigate('DiscoverStackNavigator')}
            >
              <VectorIcon.MCI name='compass' color={Colors.white} size={40} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => homeStackNavigation.navigate('AboutApp', { url: urls.howToCreateNewSpace })}
            >
              <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  Discover new
                </Text>
              </View>
              <View style={{ borderBottomColor: 'white', borderBottomWidth: 0.3, alignSelf: 'center' }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '700',
                  }}
                >
                  space
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
