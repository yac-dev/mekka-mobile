import { axiosClient } from '../axiosClient';
import { UpdateUserInputType, UpdateUserOutputType } from '../types';

export const updateUser = async (input: UpdateUserInputType): Promise<UpdateUserOutputType> => {
  const result = await axiosClient.patch('/', input);
  const { user } = result.data;
  // まあ、ここではaxios発動して、translateするだけだからな。役割は。
  return {
    user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar },
  };
};
