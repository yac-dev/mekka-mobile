import backendAPI from '../../../apis/backend';
import { JoinPublicSpaceByIdInputType, JoinPublicSpaceByIdOutputType } from '../types';

export const joinPublicSpaceById = async (
  input: JoinPublicSpaceByIdInputType
): Promise<JoinPublicSpaceByIdOutputType> => {
  try {
    const result = await backendAPI.post(`/spaces/${input.spaceId}/public`, { userId: input.userId });
    const { space } = result.data.data;

    return {
      space,
    };
  } catch (error) {
    throw error;
  }
};
