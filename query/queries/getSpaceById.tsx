import { axiosClient } from '../axiosClient';
import { GetSpaceByIdInputType, GetSpaceByIdOutputType } from '../types';

export const getSpaceById = async (input: GetSpaceByIdInputType): Promise<GetSpaceByIdOutputType> => {
  try {
    const result = await axiosClient.get(`/spaces/${input._id}`);
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
