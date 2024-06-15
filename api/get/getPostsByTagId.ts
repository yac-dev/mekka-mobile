import backendAPI from '../../apis/backend';
import { GetPostsByTagIdInputType, GetPostsByTagIdOutputType } from '../types';

export const getPostsByTagId = async (input: GetPostsByTagIdInputType): Promise<GetPostsByTagIdOutputType> => {
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
