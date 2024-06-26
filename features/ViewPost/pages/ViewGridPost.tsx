import React, { useState } from 'react';
import { ViewPost } from '../components';
import { getPostsByTagIdAtomFamily } from '../../Space/atoms';
import { PostType, TagType } from '../../../types';
import { useRecoilValue } from 'recoil';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SpaceStackParams, ViewPostStackNavigatorParams } from '../../../navigations/SpaceStackNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

type IViewGridPost = NativeStackScreenProps<ViewPostStackNavigatorParams, 'ViewGridPost'>;

export const ViewGridPost: React.FC<IViewGridPost> = ({ route }) => {
  const { tag, currentPostIndex } = route.params;
  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));
  const [currentPost, setCurrentPost] = useState(getPostsByTagIdResult.data.posts[currentPostIndex]);
  // やっぱ、currentPostは必要だ。
  const onCurrentPostChange = (post: PostType) => {
    setCurrentPost(post);
  };

  return (
    <ViewPost
      posts={getPostsByTagIdResult.data.posts}
      currentPost={currentPost}
      onCurrentPostChange={onCurrentPostChange}
      currentPostIndex={currentPostIndex}
    />
  );
};
