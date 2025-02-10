import { axiosClient } from '../axiosClient';
import { UpdateMeInputType, UpdateMeOutputType } from '../types';

export const updateMe = async (input: UpdateMeInputType): Promise<UpdateMeOutputType> => {
  try {
    const result = await axiosClient.patch(`/auth/${input.userId}`, input);
    const { user } = result.data.data;
    return user;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred during loading your data...');
    }
  }
};
