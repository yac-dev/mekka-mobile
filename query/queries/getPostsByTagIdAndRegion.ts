import { axiosClient } from '../axiosClient';
import { GetPostsByTagIdAndRegionInput, GetPostsByTagIdAndRegionOutput } from '../types';

export const getPostsByTagIdAndRegion = async (
  input: GetPostsByTagIdAndRegionInput
): Promise<GetPostsByTagIdAndRegionOutput> => {
  try {
    const result = await axiosClient.post(`/posts/tag/${input.tagId}/region`, { region: input.region });
    const { posts } = result.data.data;
    return {
      posts,
    };
  } catch (error) {
    throw error;
  }
};
