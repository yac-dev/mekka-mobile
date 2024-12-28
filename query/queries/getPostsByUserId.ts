import { axiosClient } from '../axiosClient';
import { GetPostsByUserIdInputType, GetPostsByUserIdOutputType } from '../types';

export const getPostsByUserId = async (input: GetPostsByUserIdInputType): Promise<GetPostsByUserIdOutputType> => {
  try {
    const result = await axiosClient.get(`/posts/${input.userId}/?page=${input.currentPage}`);
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
