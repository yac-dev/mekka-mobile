import backendAPI from '../../apis/backend';
import { CreateCommentInputType } from '../types';

export const createComment = async (input: CreateCommentInputType) => {
  const result = await backendAPI.post(`/comments/`, input);
};
