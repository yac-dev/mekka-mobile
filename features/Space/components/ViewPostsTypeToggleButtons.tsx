import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SpaceRootContext } from '../providers/SpaceRootProvider';
import { CurrentSpaceContext, CurrentTagContext } from '../../../providers';
import { VectorIcon } from '../../../Icons';
import { Icons } from '../../../Icons/images';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { SpaceRootStackNavigatorProp } from '../../../navigations';
import { Colors } from '../../../themes/colors';
import { SpaceType } from '../../../types';
import { viewPostsTypeAtomFamily } from '../atoms';
import { useRecoilValue } from 'recoil';

type ViewPostsTypeToggleButtonProps = {
  space: SpaceType;
  onGridViewPress: () => void;
  onMapViewPress: () => void;
};

export const ViewPostsTypeToggleButton: React.FC<ViewPostsTypeToggleButtonProps> = ({
  space,
  onGridViewPress,
  onMapViewPress,
}) => {
  const navigation = useNavigation<SpaceRootStackNavigatorProp>();
  // const { viewPostsType, setViewPostsType } = useContext(SpaceRootContext);
  const viewPostsType = useRecoilValue(viewPostsTypeAtomFamily(space._id));
  const { currentTag } = useContext(CurrentTagContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginRight: 15,
          padding: 5,
          backgroundColor: viewPostsType === 'grid' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'grid' ? 12 : 0,
        }}
        onPress={() => onGridViewPress()}
      >
        <VectorIcon.MCI name='dots-grid' color='white' size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 7,
          backgroundColor: viewPostsType === 'region' ? 'rgb(80,80,80)' : null,
          borderRadius: viewPostsType === 'region' ? 12 : 0,
        }}
        onPress={() => onMapViewPress()}
      >
        <ExpoImage
          style={{ width: 25, height: 25 }}
          source={Icons.globe}
          contentFit='contain'
          tintColor={Colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: 'rgb(50,50,50)',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
