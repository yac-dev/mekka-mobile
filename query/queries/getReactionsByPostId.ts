import { axiosClient } from '../axiosClient';
import { GetReactionsByPostIdInputType } from '../types';

export const getReactionsByPostId = async (input: GetReactionsByPostIdInputType) => {
  try {
    const response = await axiosClient.get(`/posts/${input.postId}/reactions/${input.spaceId}`);
    const { reactions } = response.data.data;
    return {
      reactions,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
