import { axiosClient } from '../axiosClient';
import { GetUserByIdInputType, GetUserByIdOutputType } from '../types';

export const getUserById = async (input: GetUserByIdInputType): Promise<GetUserByIdOutputType> => {
  try {
    const result = await axiosClient.get(`/users/${input.userId}`);
    const { user } = result.data.data;

    return {
      user,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching user data...');
    }
  }
};
