import React, { useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform, Alert } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { GridView } from '../../Space/components/GridView';
import { RegionView } from './RegionView';
import { CurrentSpace } from './CurrentSpace';
import { Features } from './Features';
import { Image as ExpoImage } from 'expo-image';
import { currentSpaceAtom, momentLogsAtom } from '../../../recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { VectorIcon } from '../../../Icons';
import { ViewMenuFAB } from './ViewMenuFAB';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations';
import * as Haptics from 'expo-haptics';
import { AppBottomSheet } from '../../../components/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Icons } from '../../../Icons/images';
import { Colors } from '../../../themes';

const renderScene = SceneMap({
  GridView: CurrentSpace,
  RegionView: RegionView,
});

const routes = [
  { key: 'GridView', title: 'Grid View' },
  { key: 'RegionView', title: 'Region View' },
];

const windowWidth = Dimensions.get('window').width;
const viewItemContainerWidth = windowWidth / 3;
const viewItemButtonWidth = viewItemContainerWidth * 0.7;

export const Views: React.FC<{
  openAddNewPostMenuBottomSheet: (index: number) => void;
  openAuthMenuBottomSheet: (index: number) => void;
}> = ({ openAddNewPostMenuBottomSheet, openAuthMenuBottomSheet }) => {
  const [index, setIndex] = React.useState(0);
  const currentSpace = useRecoilValue(currentSpaceAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [momentLogs, setMomentLogs] = useRecoilState(momentLogsAtom);
  const chooseViewBottomSheetRef = useRef<BottomSheetModal>(null);

  const openChooseViewBottomSheet = (index: number) => {
    chooseViewBottomSheetRef.current?.snapToIndex(index);
  };

  const closeChooseViewBottomSheet = () => {
    chooseViewBottomSheetRef.current?.close();
  };

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

  const onTabPress = (item) => {
    setIndex(item.key);
  };
  // <TouchableOpacity onPress={() => setIndex(0)}>
  //         <Text style={{ color: 'white' }}>Grid</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={() => setIndex(1)}>
  //         <Text style={{ color: 'white' }}>Map</Text>
  //       </TouchableOpacity>

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <TabView
        lazy
        renderTabBar={() => null}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        animationEnabled={false}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          left: 10,
          width: 40,
          height: 40,
          backgroundColor: 'rgb(50,50,50)',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => openChooseViewBottomSheet(0)}
      >
        <Text style={{ color: 'white', fontSize: 10 }}>P</Text>
      </TouchableOpacity>
      <View
        style={{
          width: 170,
          height: 55,
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
            <View style={{ width: 24, aspectRatio: 1, marginBottom: 3 }}>
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
          style={{}}
          activeOpacity={0.7}
          onPress={() => {
            openAddNewPostMenuBottomSheet(0);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }}
        >
          <ExpoImage source={{ uri: currentSpace.icon }} style={{ width: 38, height: 38, borderRadius: 30 }} />
          <AddIcon />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => onRollsPress()}
        >
          <View style={{ width: 24, aspectRatio: 1, marginBottom: 3 }}>
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
      <AppBottomSheet.Gorhom
        ref={chooseViewBottomSheetRef}
        snapPoints={['35%']}
        header={<Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>Choose View</Text>}
        onCloseButtonClose={closeChooseViewBottomSheet}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: viewItemContainerWidth,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: viewItemButtonWidth,
                height: viewItemButtonWidth,
                backgroundColor: 'rgb(70,70,70)',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}
              onPress={() => {
                setIndex(0);
                closeChooseViewBottomSheet();
              }}
            >
              <VectorIcon.FI name='nav-icon-grid' size={30} color={'white'} />
              {index === 0 ? <CheckIcon /> : null}
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15 }}>Grid</Text>
          </View>
          <View
            style={{
              width: viewItemContainerWidth,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: viewItemButtonWidth,
                height: viewItemButtonWidth,
                backgroundColor: 'rgb(70,70,70)',
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}
              onPress={() => {
                setIndex(1);
                closeChooseViewBottomSheet();
              }}
            >
              <ExpoImage
                style={{ width: 30, height: 30 }}
                source={Icons.globe}
                contentFit='contain'
                tintColor={Colors.white}
              />
              {index === 1 ? <CheckIcon /> : null}
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 15 }}>Map</Text>
          </View>
        </View>
      </AppBottomSheet.Gorhom>
    </View>
  );
};

const AddIcon = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgb(50,50,50)',
        width: 18,
        height: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: -5,
      }}
    >
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          width: 12,
          height: 12,
          borderRadius: 20,
        }}
      >
        <VectorIcon.II name='add' size={10} color={'black'} />
      </View>
    </View>
  );
};

const CheckIcon = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: -8,
        right: -8,
        width: 30,
        height: 30,
        backgroundColor: 'rgb(30,30,30)',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VectorIcon.MCI name='check' color='black' size={15} />
      </View>
    </View>
  );
};
