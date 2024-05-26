import backendAPI from '../../../apis/backend';
import { GetSpaceByIdInputType, GetSpaceByIdOutputType } from '../types';

export const getSpaceById = async (input: GetSpaceByIdInputType): Promise<GetSpaceByIdOutputType> => {
  try {
    const result = await backendAPI.get(`/spaces/${input._id}`);
    const { space } = result.data.data;
    return {
      space,
    };
  } catch (error) {
    throw error;
  }
};
