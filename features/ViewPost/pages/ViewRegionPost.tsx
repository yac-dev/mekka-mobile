import React, { useState } from 'react';
import { ViewPost } from '../components';
import { getPostsByTagIdAndRegionResultAtomFamily } from '../../Space/atoms';
import { PostType, TagType } from '../../../types';
import { useRecoilValue } from 'recoil';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ViewPostStackNavigatorParams } from '../../../navigations/SpaceStackNavigator';

type IViewGridPost = {
  tag: TagType;
};

type IViewRegionPost = NativeStackScreenProps<ViewPostStackNavigatorParams, 'ViewGridPost'>;

// 結局さ、tag自体はpropsで渡してくればいいよね、ていうことにはなっている。。。
export const ViewRegionPost: React.FC<IViewRegionPost> = ({ route }) => {
  const { tag, currentPostIndex } = route.params;
  const getPostsByTagIdAndRegionResult = useRecoilValue(getPostsByTagIdAndRegionResultAtomFamily(tag._id));
  const [currentPost, setCurrentPost] = useState(getPostsByTagIdAndRegionResult.data.posts[currentPostIndex]);
  // やっぱ、currentPostは必要だ。
  const onCurrentPostChange = (post: PostType) => {
    setCurrentPost(post);
  };

  return (
    <ViewPost
      posts={getPostsByTagIdAndRegionResult.data.posts}
      currentPost={currentPost}
      onCurrentPostChange={onCurrentPostChange}
      currentPostIndex={currentPostIndex}
    />
  );
};
