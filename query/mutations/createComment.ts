import { axiosClient } from '../axiosClient';
import { CreateCommentInputType, CreateCommentOutputType } from '../types';

export const createComment = async (input: CreateCommentInputType): Promise<CreateCommentOutputType> => {
  try {
    const result = await axiosClient.post(`/comments/`, input);
    const { comment } = result.data.data;
    return { comment };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your logs...');
    }
  }
};
