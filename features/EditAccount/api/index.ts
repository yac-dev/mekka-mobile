import backendAPI from '../../../apis/backend';
import { UpdateUserInputType, UpdateUserOutputType } from '../types';

// inputとoutputもここで設定しようか。
const translate = (data) => {};

// まあcodegen的なもんはとりあえず置いておこう。
export const updateUser = async (input: UpdateUserInputType): Promise<UpdateUserOutputType> => {
  const result = await backendAPI.patch('/', input);
  const { user } = result.data;
  // まあ、ここではaxios発動して、translateするだけだからな。役割は。
  return {
    user: { _id: user._id, name: user.name, email: user.email, password: user.password, avatar: user.avatar },
  };
};
