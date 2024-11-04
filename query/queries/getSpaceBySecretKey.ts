import { axiosClient } from '../axiosClient';
import { GetSpaceBySecretKeyInputType, GetSpaceBySecretKeyOutputType } from '../types';

export const getSpaceBySecretKey = async (
  input: GetSpaceBySecretKeyInputType
): Promise<GetSpaceBySecretKeyOutputType> => {
  try {
    const result = await axiosClient.get(`/spaces/secretkey/${input.secretKey}`);
    const { space } = result.data.data;
    return {
      space,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
