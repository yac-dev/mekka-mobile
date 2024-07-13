import backendAPI from '../../apis/backend';
import { GetReactionsByPostIdInputType } from '../types';

export const getReactionsByPostId = async (input: GetReactionsByPostIdInputType) => {
  try {
    const response = await backendAPI.get(`/posts/${input.postId}/reactions/${input.spaceId}`);
    const { reactions } = response.data.data;
    return {
      reactions,
    };
  } catch (error) {
    throw error;
  }
};
