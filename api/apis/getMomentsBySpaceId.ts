import backendAPI from '../../apis/backend';
import { GetMomentsBySpaceIdInputType } from '../types';

export const getMomentsBySpaceId = async (input: GetMomentsBySpaceIdInputType) => {
  try {
    const result = await backendAPI.get(`/posts/space/${input.spaceId}/moments`);
    const { posts } = result.data.data;
    return {
      posts,
    };
  } catch (error) {
    throw error;
  }
};
