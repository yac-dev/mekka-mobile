import backendAPI from '../../apis/backend';
import { GetCommentsByPostIdInputType, GetCommentsByPostIdOutputType } from '../types';

export const getCommentsByPostId = async (
  input: GetCommentsByPostIdInputType
): Promise<GetCommentsByPostIdOutputType> => {
  const result = await backendAPI.get(`/comments/post/${input.postId}`);
  const { comments } = result.data.data;

  return { comments };
};
