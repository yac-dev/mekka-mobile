import { axiosClient } from '../axiosClient';
import { GetCommentsByPostIdInputType, GetCommentsByPostIdOutputType } from '../types';

export const getCommentsByPostId = async (
  input: GetCommentsByPostIdInputType
): Promise<GetCommentsByPostIdOutputType> => {
  try {
    // そもそもなんでここ実行されない。。。？
    console.log('getCommentsByPostId', input.postId);
    const result = await axiosClient.get(`/comments/post/${input.postId}`);
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
