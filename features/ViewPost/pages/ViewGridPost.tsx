import React from 'react';
import { View, Text } from 'react-native';
import { ViewPost } from '../components';
import { getPostsByTagIdAtomFamily } from '../../Space/atoms';
import { TagType } from '../../../types';
import { useRecoilValue } from 'recoil';

type IViewGridPost = {
  tag: TagType;
};

export const ViewGridPost: React.FC<IViewGridPost> = ({ tag }) => {
  const getPostsByTagIdResult = useRecoilValue(getPostsByTagIdAtomFamily(tag._id));

  return <ViewPost posts={getPostsByTagIdResult.data.posts} />;
};
