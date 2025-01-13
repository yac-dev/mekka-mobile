import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations';
import { momentLogsAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { VectorIcon } from '../../../Icons';
import { Times } from '../../../utils';

const tagOuterWidth = Dimensions.get('window').width / 4;

export const Features = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);

  const onRollsPress = () => {
    Alert.alert('🛠️ Under Construction', 'Rolls feature will be available in the next update.', [
      { text: 'Got it', onPress: () => null },
    ]);
  };

  const onMomentsPress = () => {
    setMomentLogs((previous) => {
      return {
        ...previous,
        [currentSpace._id]: 0,
      };
    });
    homeStackNavigation.navigate('MomentsStackNavigator');
  };

  return (
    <View
      style={{
        width: 130,
        height: 45,
        backgroundColor: 'rgb(50,50,50)',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        borderRadius: 100,
        flexDirection: 'row',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => onMomentsPress()}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 18, aspectRatio: 1, marginBottom: 3 }}>
            <ExpoImage
              style={{
                width: '100%',
                height: '100%',
              }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='cover'
              tintColor={'white'}
            />
          </View>
          <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>Moments</Text>
          {momentLogs[currentSpace._id] ? (
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: 0,
                width: 16,
                height: 16,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10 }}>{momentLogs[currentSpace._id]}</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => onRollsPress()}
      >
        <View style={{ width: 18, aspectRatio: 1, marginBottom: 3 }}>
          <ExpoImage
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../../../assets/forApp/film-roll.png')}
            contentFit='cover'
            tintColor={'white'}
          />
        </View>
        <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>Rolls</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

{
  /* <View style={{ paddingLeft: 15, paddingTop: 10 }}>
        <Text style={{ color: 'rgb(150,150,150)' }}>Features</Text>
      </View> */
}
{
  /* <View style={{ flexDirection: 'column', paddingVertical: 10 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            paddingVertical: 8,
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => onMomentsPress()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ExpoImage
              style={{
                width: 20,
                aspectRatio: 1,
                marginRight: 10,
              }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='cover'
              tintColor={'white'}
            />
            <Text style={{ color: 'white', fontSize: 15 }}>Moments</Text>
          </View>
          {momentLogs[currentSpace._id] ? (
            <View
              style={{
                width: 16,
                height: 16,
                marginRight: 15,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>{momentLogs[currentSpace._id]}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            paddingVertical: 10,
            paddingLeft: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => onRollsPress()}
        >
          <ExpoImage
            style={{ width: 20, aspectRatio: 1, marginRight: 10 }}
            source={require('../../../assets/forApp/film-roll.png')}
            contentFit='cover'
            tintColor={'white'}
          />
          <View>
            <Text style={{ color: 'white', fontSize: 15 }}>Rolls</Text>
          </View>
        </TouchableOpacity>
        <View style={{ width: '90%', backgroundColor: 'rgb(80,80,80)', height: 0.5, alignSelf: 'center' }}></View>
      </View> */
}
