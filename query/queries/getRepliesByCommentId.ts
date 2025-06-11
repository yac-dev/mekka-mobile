import { axiosClient } from '../axiosClient';
import { GetRepliesByCommentIdInputType, GetRepliesByCommentIdOutputType } from '../types';

export const getRepliesByCommentId = async (
  input: GetRepliesByCommentIdInputType
): Promise<GetRepliesByCommentIdOutputType> => {
  try {
    const result = await axiosClient.get(`/comments/${input.commentId}/replies`);
    const { replies } = result.data.data;

    return {
      replies,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
