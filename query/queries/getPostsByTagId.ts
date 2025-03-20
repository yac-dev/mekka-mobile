import { axiosClient } from '../axiosClient';
import { GetPostsByTagIdInputType, GetPostsByTagIdOutputType } from '../types';

export const getPostsByTagId = async (input: GetPostsByTagIdInputType): Promise<GetPostsByTagIdOutputType> => {
  try {
    const result = await axiosClient.get(`/tags/${input.tagId}/posts?page=${input.currentPage}`);
    const { posts, currentPage, hasNextPage } = result.data.data;
    return {
      posts,
      currentPage,
      hasNextPage,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
