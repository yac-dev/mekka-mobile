import backendAPI from '../../../apis/backend';
import { GetMembersBySpaceIdInputType, GetMembersBySpaceIdOutputType } from '../types';

export const getMembersBySpaceId = async (
  input: GetMembersBySpaceIdInputType
): Promise<GetMembersBySpaceIdOutputType> => {
  try {
    const result = await backendAPI.get(`/users/${input.spaceId}/space`);
    const { users } = result.data.data;

    return {
      users,
    };
  } catch (error) {
    throw error;
  }
};
