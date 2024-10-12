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

// 多分、componsnetのほうがいいかもな。。
const tagOuterWidth = Dimensions.get('window').width / 4;
const tagSquareWidth = tagOuterWidth * 0.63;

export const Features = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);

  const features = [
    // {
    //   icon: (
    // <ExpoImage
    //   style={{
    //     width: tagSquareWidth * 0.45,
    //     aspectRatio: 1,
    //     marginRight: 4,
    //   }}
    //   source={
    //     currentSpace.contentType === 'photo'
    //       ? require('../../../assets/forApp/photo.png')
    //       : currentSpace.contentType === 'video'
    //       ? require('../../../assets/forApp/video.png')
    //       : require('../../../assets/forApp/photo-video.png')
    //   }
    //   contentFit='cover'
    //   tintColor={'white'}
    // />
    //   ),
    //   feature: 'New Post',
    //   subtitle: currentSpace.videoLength ? `${currentSpace.videoLength}s` : undefined,
    //   action: () => homeStackNavigation.navigate('CreateNewPostStackNavigator'),
    // },
    // ここのpostを足さないといけない。
    {
      icon: (
        <View>
          <ExpoImage
            style={{
              width: tagSquareWidth * 0.45,
              aspectRatio: 1,
              marginRight: 4,
            }}
            source={require('../../../assets/forApp/ghost.png')}
            contentFit='cover'
            tintColor={'white'}
          />
          {momentLogs[currentSpace._id] ? (
            <View
              style={{
                width: 20,
                height: 20,
                marginRight: 15,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}
            >
              <Text style={{ color: 'white', fontSize: 12 }}>{momentLogs[currentSpace._id]}</Text>
            </View>
          ) : null}
        </View>
      ),
      feature: 'Moments',
      // subtitle: Times.minutesToHoursAndMinutes(currentSpace.disappearAfter),
      subtitle: '',
      action: () => onMomentsPress(),
    },
    {
      icon: (
        <ExpoImage
          style={{
            width: tagSquareWidth * 0.45,
            aspectRatio: 1,
            marginRight: 4,
          }}
          source={require('../../../assets/forApp/film-roll.png')}
          contentFit='cover'
          tintColor={'white'}
        />
      ),
      feature: 'Rolls',
      action: () => onRollsPress(),
    },
  ];
  const tagOuterWidth = Dimensions.get('window').width / 4;

  const onRollsPress = () => {
    Alert.alert('Not available now', 'The Rolls feature will be available in the next update.', [
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

  // {momentLogs[currentSpace._id] ? (
  //   <View
  //     style={{
  //       width: 16,
  //       height: 16,
  //       marginRight: 15,
  //       borderRadius: 8,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       backgroundColor: 'red',
  //     }}
  //   >
  //     <Text style={{ color: 'white', fontSize: 12 }}>{momentLogs[currentSpace._id]}</Text>
  //   </View>
  // ) : null}

  // feature arrayを型付けしたい。

  const renderItem = ({ item }: { item: (typeof features)[number] }) => {
    return (
      <View style={{ width: tagOuterWidth, height: 90, alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: tagSquareWidth,
            aspectRatio: 1,
            borderRadius: 18,
            backgroundColor: 'rgb(40,40,40)',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
          }}
          onPress={item.action}
        >
          {item.icon}
        </TouchableOpacity>
        <Text numberOfLines={2} style={{ color: 'white', fontSize: 11, textAlign: 'center', fontWeight: '700' }}>
          {item.feature}
        </Text>
        <Text numberOfLines={2} style={{ color: 'rgb(150,150,150)', fontSize: 11, textAlign: 'center' }}>
          {item.subtitle}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList horizontal data={features} renderItem={renderItem} />
      <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
        <View style={{ height: 1, backgroundColor: 'rgb(70,70,70)' }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgb(70,70,70)',
  },
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
