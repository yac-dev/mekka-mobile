import { axiosClient } from '../axiosClient';
import { GetMomentsBySpaceIdInputType, GetMomentsBySpaceIdOutputType } from '../types';

export const getMomentsBySpaceId = async (
  input: GetMomentsBySpaceIdInputType
): Promise<GetMomentsBySpaceIdOutputType> => {
  try {
    const result = await axiosClient.get(`/posts/space/${input.spaceId}/moments`);
    const { posts } = result.data.data;
    return {
      posts,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
