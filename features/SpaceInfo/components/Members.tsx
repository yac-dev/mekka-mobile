import React, { useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Share,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useGetMembersBySpaceIdState } from '../hooks';
import { UserType } from '../../../types';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { useGetMembersBySpaceId } from '../hooks/useGetMembersBySpaceId';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { getMembersBySpaceId } from '../../../api';
import { queryKeys } from '../../../query';
import { useNavigation } from '@react-navigation/native';
import { SpaceInfoStackNavigatorProps } from '../navigations';
import { HEADER_HEIGHT, TAB_BAR_HEIGHT } from '../pages/SpaceInfo';
type MembersProps = {
  spaceId: string;
  position: any;
  syncOffset: any;
  secondRef: any;
  onMomentumScrollBegin: any;
};
const itemWidth = Dimensions.get('window').width / 3;
const avatarWidth = itemWidth * 0.7;
// 久々にtan stackやってみよっか。
export const Members: React.FC<MembersProps> = ({ position, syncOffset, secondRef, onMomentumScrollBegin }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const spaceInfoStackNavigation = useNavigation<SpaceInfoStackNavigatorProps>();
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.members, currentSpace._id],
    queryFn: () => getMembersBySpaceId({ spaceId: currentSpace._id }),
  });

  const renderUser = useCallback(({ item }: { item: UserType }) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          width: itemWidth,
          height: itemWidth,
        }}
        activeOpacity={0.5}
        onPress={() => {
          spaceInfoStackNavigation.navigate('UserStackNavigator', { userId: item._id });
        }}
      >
        <View
          style={{
            backgroundColor: 'rgb(70,70,70)',
            justifyContent: 'center',
            alignItems: 'center',
            width: avatarWidth,
            height: avatarWidth,
            borderRadius: avatarWidth / 2,
            marginBottom: 10,
          }}
        >
          {item.avatar ? (
            <ExpoImage
              style={{ width: avatarWidth, height: avatarWidth }}
              source={{ uri: item.avatar }}
              contentFit='contain'
            />
          ) : (
            <Text style={{ color: 'white', fontSize: 35, textAlign: 'center', fontWeight: 'bold' }}>
              {item.name.slice(0, 2).toUpperCase()}
            </Text>
          )}
        </View>
        <Text numberOfLines={2} style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.black, paddingTop: 10 }}>
      <Animated.FlatList
        ref={secondRef}
        scrollEventThrottle={1}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: position } } }], {
          useNativeDriver: true,
        })}
        onMomentumScrollEnd={(e) => {
          syncOffset('members', e.nativeEvent.contentOffset.y);
        }}
        data={data.users}
        numColumns={3}
        renderItem={renderUser}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT + TAB_BAR_HEIGHT, paddingBottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
