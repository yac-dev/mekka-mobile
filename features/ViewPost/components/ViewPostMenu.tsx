import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';
import { TagScreenContext } from '../../Space';
import { PostType } from '../../../types';

type ViewPostMenuProps = {
  post: PostType;
  onReactionPress: () => void;
  onCommentsPress: () => void;
  onAvatarPress: () => void;
  onHorizontalDotsPress: () => void;
};

export const ViewPostMenu: React.FC<ViewPostMenuProps> = ({
  post,
  onReactionPress,
  onCommentsPress,
  onAvatarPress,
  onHorizontalDotsPress,
}) => {
  // const { currentPost } = useContext(TagScreenContext);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ExpoImage source={post.createdBy.avatar} style={{ width: 30, height: 30, marginRight: 15 }} />
        <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{post.createdBy.name}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppButton.Icon
          onButtonPress={onReactionPress}
          customStyle={{ width: 44, height: 44, backgroundColor: 'rgb(50,50,50)', marginRight: 15, borderRadius: 22 }}
          hasShadow={false}
        >
          <Text style={{ fontSize: 25 }}>😁</Text>
        </AppButton.Icon>
        <AppButton.Icon
          onButtonPress={onCommentsPress}
          customStyle={{ width: 44, height: 44, marginRight: 15, backgroundColor: 'rgb(50,50,50)', borderRadius: 22 }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='comment-multiple' size={20} style={{ color: 'white' }} />
        </AppButton.Icon>
        <AppButton.Icon
          onButtonPress={onHorizontalDotsPress}
          customStyle={{ width: 44, height: 44, backgroundColor: 'rgb(50,50,50)', borderRadius: 22 }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='dots-horizontal' size={20} style={{ color: 'white' }} />
        </AppButton.Icon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    width: '100%',
    paddingHorizontal: 15,
  },
});
