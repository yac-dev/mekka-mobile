import React from 'react';
import { View, Text, TouchableOpacity, Linking, Dimensions, ScrollView } from 'react-native';
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

const screenHorizontalPadding = 20;

const itemWidth = (Dimensions.get('window').width - screenHorizontalPadding * 2) / 2;

export const NoSpaces: React.FC<NoSpacesProps> = ({ openAuthMenuBottomSheet, openAppBlogWebviewBottomSheet }) => {
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  // webviewにしたいんだわな。。。linkingはやめよう、appから離れてしまう。。。
  const openLink = async (url: string) => {
    await Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 30, alignItems: 'flex-end', paddingRight: 10, paddingBottom: 50 }}>
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
      <View>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginBottom: 20 }}>
          You haven't joined any spaces now
        </Text>
        <Text style={{ color: 'rgb(170,170,170)', textAlign: 'center', marginBottom: 50 }}>
          Let's get started down below.
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: 'row' }}
        contentContainerStyle={{
          paddingLeft: screenHorizontalPadding,
          paddingRight: 5,
          paddingVertical: 10,
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
            onPress={() => homeStackNavigation.navigate('CreateNewSpaceStackNavigator')}
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
              <VectorIcon.MCI name='rocket-launch' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Create New</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Open your own space from here</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -10,
              right: 5,
              backgroundColor: 'black',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={0.7}
            onPress={() => openAppBlogWebviewBottomSheet(1)}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VectorIcon.AD name='question' color='black' size={20} />
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
            onPress={() => homeStackNavigation.navigate('EnterPrivateSpace')}
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
              <VectorIcon.II name='key' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>
                Enter Private Key
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Got invitation key?</Text>
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -10,
                right: -8,
                backgroundColor: 'black',
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => openAppBlogWebviewBottomSheet(1)}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.AD name='question' color='black' size={20} />
              </View>
            </TouchableOpacity>
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
            onPress={() => homeStackNavigation.navigate('DiscoverStackNavigator')}
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
              <VectorIcon.MCI name='compass' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Discover New</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Jump into public space</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
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
      </View> */}
    </View>
  );
};
