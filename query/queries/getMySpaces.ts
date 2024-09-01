import { axiosClient } from '../axiosClient';
import { GetMySpacesInput, GetMySpacesOutput } from '../types';

export const getMySpaces = async (input: GetMySpacesInput): Promise<GetMySpacesOutput> => {
  try {
    const result = await axiosClient.get(`/spaceanduserrelationships/users/${input.userId}`);
    const { mySpaces } = result.data.data;
    return {
      mySpaces,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
