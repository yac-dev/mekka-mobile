import backendAPI from '../../../apis/backend';
import { GetPostsInputType, GetPostsOutputType } from '../types';

export const getPosts = async (input: GetPostsInputType): Promise<GetPostsOutputType> => {
  try {
    const result = await backendAPI.get(`/posts/tag/${input.tagId}?page=${input.currentPage}`);
    const { posts, nextPage } = result.data.data;
    return {
      posts,
      nextPage,
    };
  } catch (error) {
    throw error;
  }
};
