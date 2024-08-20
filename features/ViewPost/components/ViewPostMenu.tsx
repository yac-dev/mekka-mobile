import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';
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
      <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: 20 }}>
        <AppButton.Icon
          onButtonPress={onCommentsPress}
          customStyle={{ width: 44, height: 44, backgroundColor: 'rgb(50,50,50)', borderRadius: 22 }}
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
        <AppButton.Icon
          onButtonPress={onHorizontalDotsPress}
          customStyle={{
            width: 44,
            height: 44,
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 22,
          }}
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
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    width: '100%',
    padding: 5,
  },
});
