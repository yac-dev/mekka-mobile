import { axiosClient } from '../axiosClient';
import { CreateCommentInputType, CreateCommentOutputType } from '../types';

export const incrementReaction = async (input: IncrementReactionInputType): Promise<IncrementReactionOutputType> => {
  try {
    const result = await axiosClient.post(`/reactions/`, input);
    const { reaction } = result.data.data;
    return { reaction };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your logs...');
    }
  }
};
