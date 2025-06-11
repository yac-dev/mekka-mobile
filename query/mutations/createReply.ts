import { axiosClient } from '../axiosClient';
import { CreateReplyInputType, CreateReplyOutputType } from '../types';

export const createReply = async (input: CreateReplyInputType): Promise<CreateReplyOutputType> => {
  try {
    const result = await axiosClient.post(`/replies`, input);
    const { reply } = result.data.data;
    return { reply };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your logs...');
    }
  }
};
