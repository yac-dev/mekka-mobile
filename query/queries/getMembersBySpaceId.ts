import { axiosClient } from '../axiosClient';
import { GetMembersBySpaceIdInputType, GetMembersBySpaceIdOutputType } from '../types';

export const getMembersBySpaceId = async (
  input: GetMembersBySpaceIdInputType
): Promise<GetMembersBySpaceIdOutputType> => {
  try {
    const result = await axiosClient.get(`/users/${input.spaceId}/space`);
    const { users } = result.data.data;

    return {
      users,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
