import { axiosClient } from '../axiosClient';
import { GetSpacesInputType, GetSpacesOutputType } from '../types';

export const getSpaces = async (input: GetSpacesInputType): Promise<GetSpacesOutputType> => {
  try {
    const result = await axiosClient.get(`/spaces?page=${input.currentPage}`);
    const { spaces, currentPage, hasNextPage } = result.data.data;
    return {
      spaces,
      currentPage,
      hasNextPage,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
