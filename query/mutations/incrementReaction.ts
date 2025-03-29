import { axiosClient } from '../axiosClient';
import { IncrementReactionInputType, IncrementReactionOutputType } from '../types';

export const incrementReaction = async (input: IncrementReactionInputType): Promise<IncrementReactionOutputType> => {
  console.log('input', input);
  try {
    const result = await axiosClient.post(`/postandreactionanduserrelationships`, input);
    const { reaction } = result.data.data;
    return { reaction };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred while incrementing a reaction...');
    }
  }
};
