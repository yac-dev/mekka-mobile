import { axiosClient } from '../axiosClient';
import { GetPostsByUserIdAndRegionInputType, GetPostsByUserIdAndRegionOutputType } from '../types';

export const getPostsByUserIdAndRegion = async (
  input: GetPostsByUserIdAndRegionInputType
): Promise<GetPostsByUserIdAndRegionOutputType> => {
  try {
    const result = await axiosClient.get(`/posts/user/${input.userId}/space/${input.spaceId}/region`);
    const { posts } = result.data.data;
    return {
      posts,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
