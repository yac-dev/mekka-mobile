import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getPostsByTagId } from '../../../query';
import { queryKeys } from '../../../query';
import { FlashList } from '@shopify/flash-list';
import { PostThumbnail } from '../../../components';
import { PostType } from '../../../types';

type PostsByGridProps = {
  tagId: string;
};

export const PostsByGrid: React.FC<PostsByGridProps> = ({ tagId }) => {
  const { data, status: getPostsByTagIdStatus } = useQuery({
    queryKey: [queryKeys.postsByTagId, tagId],
    queryFn: () => getPostsByTagId({ tagId: tagId, currentPage: 0 }),
  });

  const renderItem = ({ item, index }: { item: PostType; index: number }) => {
    return <PostThumbnail post={item} index={index} onPressPostThumbnail={() => null} />;
  };

  // ここでloadingをrenderしたいわけでさ。。。そもそもrouteごとに表示したいわけよ。

  if (getPostsByTagIdStatus === 'pending') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
      <FlashList
        numColumns={4}
        data={data?.posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        removeClippedSubviews
        estimatedItemSize={1000}
      />
    </View>
  );
};
