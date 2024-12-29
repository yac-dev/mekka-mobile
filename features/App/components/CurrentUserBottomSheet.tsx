import React from 'react';
import { View, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { currentUserAtom } from '../../../recoil';

export const CurrentUserBottomSheet = () => {
  const [currentUser] = useRecoilState(currentUserAtom);

  return (
    <View>
      <Text>{currentUser?.name}</Text>
    </View>
  );
};
