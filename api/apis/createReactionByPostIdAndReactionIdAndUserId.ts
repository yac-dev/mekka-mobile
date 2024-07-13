// /:postId/reactions
import backendAPI from '../../apis/backend';
import { CreateReactionByPostIdAndReactionIdAndUserIdInputType } from '../types';

export const createReactionByPostIdAndReactionIdAndUserId = async (
  input: CreateReactionByPostIdAndReactionIdAndUserIdInputType
) => {
  try {
    const response = await backendAPI.post(`/${input.postId}/reactions`, input);
    const { reactionId } = response.data.data;
    return {
      reactionId,
    };
  } catch (error) {
    throw error;
  }
};
