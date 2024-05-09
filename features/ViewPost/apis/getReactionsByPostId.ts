import backendAPI from '../../../apis/backend';
import { GetReactionsByPostIdInputType, GetReactionsByPostIdOutputType } from '../types';

export const getReactionStatuses = async (
  input: GetReactionsByPostIdInputType
): Promise<GetReactionsByPostIdOutputType> => {
  try {
    const result = await backendAPI.get(`/reactionstatuses/post/${input.postId}`);
    const { reactionStatuses } = result.data.data;
    return {
      reactionStatuses,
    };
  } catch (error) {
    throw error;
  }
};
