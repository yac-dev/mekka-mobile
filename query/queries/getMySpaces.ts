import { axiosClient } from '../axiosClient';
import { GetMySpacesInput, GetMySpacesOutput } from '../types';

export const getMySpaces = async (input: GetMySpacesInput): Promise<GetMySpacesOutput> => {
  const result = await axiosClient.get(`/spaceanduserrelationships/users/${input.userId}`);
  const { mySpaces } = result.data.data;
  return {
    mySpaces,
  };
};
