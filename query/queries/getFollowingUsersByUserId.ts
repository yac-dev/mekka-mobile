import { axiosClient } from '../axiosClient';
import { GetFollowingUsersByUserIdInputType, GetFollowingUsersByUserIdOutputType } from '../types';

export const getFollowingUsersByUserId = async (
  input: GetFollowingUsersByUserIdInputType
): Promise<GetFollowingUsersByUserIdOutputType> => {
  try {
    const result = await axiosClient.get(`/followingrelationships/users/${input.userId}`);
    const { followingUsers } = result.data.data;

    return {
      followingUsers,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
