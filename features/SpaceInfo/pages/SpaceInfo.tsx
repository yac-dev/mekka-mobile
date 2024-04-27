import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Share, Platform, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SpaceInfoTopTabNavigator from '../../../navigations/SpaceInfoTopTabNavigator';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SpaceInfoStackNavigatorProps } from '../../../navigations';
import { SpaceType } from '../../../types';
import { CurrentSpaceContext } from '../../../providers';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { AppButton } from '../../../components';
import { Members } from '../components';

export const SpaceInfo = () => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const navigation = useNavigation<SpaceInfoStackNavigatorProps>();
  const [textShown, setTextShown] = useState<boolean>(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30,30,30)' }}>
      <View style={{ height: 250, width: '100%', marginBottom: 10 }}>
        <ExpoImage style={{ width: '100%', height: '100%' }} source={{ uri: currentSpace.icon }} contentFit='cover' />
        {/* これ、下に影入れた方がいいな。 */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 }}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
            position: 'absolute',
            bottom: 10,
            left: 20,
            // textShadowColor: 'rgba(0, 0, 0, 0.9)',
            // textShadowOffset: { width: -3, height: 3 },
            // textShadowRadius: 10,
            // 文字影は分からん。。。今は。。。
          }}
        >
          {currentSpace.name}
        </Text>

        <AppButton.Icon
          onButtonPress={() => navigation.goBack()}
          customStyle={{
            width: 28,
            height: 28,
            backgroundColor: 'rgb(50,50,50)',
            position: 'absolute',
            top: 10,
            left: 10,
          }}
          hasShadow={true}
        >
          <VectorIcon.II name='close' size={18} color={Colors.white} />
        </AppButton.Icon>
        <AppButton.Icon
          onButtonPress={() => navigation.goBack()}
          customStyle={{
            width: 28,
            height: 28,
            backgroundColor: 'rgb(50,50,50)',
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          hasShadow={true}
        >
          <VectorIcon.MCI name='exclamation' size={18} color={Colors.white} />
        </AppButton.Icon>
      </View>
      <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={{ marginBottom: 10 }}>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 2}
            style={{ lineHeight: 21, color: 'white' }}
          >
            {currentSpace.description}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ lineHeight: 21, marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}
            >
              {textShown ? 'Read less...' : 'Read more...'}
            </Text>
          ) : null}
        </View>
        <Members />
      </ScrollView>
    </View>
  );
};
