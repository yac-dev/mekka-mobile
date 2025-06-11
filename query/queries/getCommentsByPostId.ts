import { axiosClient } from '../axiosClient';
import { GetCommentsByPostIdInputType, GetCommentsByPostIdOutputType } from '../types';

export const getCommentsByPostId = async (
  input: GetCommentsByPostIdInputType
): Promise<GetCommentsByPostIdOutputType> => {
  try {
    const result = await axiosClient.get(`/posts/${input.postId}/comments`);
    const { comments } = result.data.data;

    return {
      comments,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
