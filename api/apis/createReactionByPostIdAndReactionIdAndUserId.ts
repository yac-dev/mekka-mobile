// /:postId/reactions
import backendAPI from '../../apis/backend';
import { CreateReactionByPostIdAndReactionIdAndUserIdInputType } from '../types';

export const createReactionByPostIdAndReactionIdAndUserId = async (
  input: CreateReactionByPostIdAndReactionIdAndUserIdInputType
) => {
  try {
    console.log('input', input);
    const response = await backendAPI.post(`/posts/${input.postId}/reactions`, input);
    const { reactionId } = response.data.data;
    return {
      reactionId,
    };
  } catch (error) {
    throw error;
  }
};
