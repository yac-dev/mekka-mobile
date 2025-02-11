import { axiosClient } from '../axiosClient';
import { JoinPublicSpaceBySpaceIdInputType, JoinPublicSpaceBySpaceIdOutputType } from '../types';

export const joinPublicSpaceBySpaceId = async (
  input: JoinPublicSpaceBySpaceIdInputType
): Promise<JoinPublicSpaceBySpaceIdOutputType> => {
  try {
    const result = await axiosClient.post(`/spaces/${input.spaceId}/public`, { userId: input.userId });
    const { space } = result.data.data;

    return {
      space,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred joining the public space...');
    }
  }
};
