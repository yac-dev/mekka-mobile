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
      <View style={{ alignSelf: 'center' }}>
        <AppButton.Icon
          onButtonPress={onCommentsPress}
          customStyle={{ width: 44, height: 44, backgroundColor: 'rgb(50,50,50)', borderRadius: 22, marginBottom: 20 }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='comment-multiple' size={20} style={{ color: 'white' }} />
        </AppButton.Icon>
        <AppButton.Icon
          onButtonPress={onReactionPress}
          customStyle={{ width: 44, height: 44, backgroundColor: 'rgb(50,50,50)', borderRadius: 22 }}
          hasShadow={false}
        >
          <Text style={{ fontSize: 25 }}>😁</Text>
        </AppButton.Icon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 150,
    right: 20,
  },
});
