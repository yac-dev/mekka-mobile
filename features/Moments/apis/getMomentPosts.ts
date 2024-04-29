import backendAPI from '../../../apis/backend';
import { GetMomentPostsInputType, GetMomentPostsOutputType } from '../type';

export const getMomentPosts = async (input: GetMomentPostsInputType): Promise<GetMomentPostsOutputType> => {
  try {
    const result = await backendAPI.get(`/spaces${input.spaceId}/posts/${input.date}`);
    const { posts } = result.data.data;
    return {
      posts,
    };
  } catch (error) {
    throw error;
  }
};
