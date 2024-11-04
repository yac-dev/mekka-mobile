import { axiosClient } from '../axiosClient';
import { GetStickersInputType, GetStickersOutputType } from '../types';

export const getStickers = async (input: GetStickersInputType): Promise<GetStickersOutputType> => {
  try {
    const result = await axiosClient.get('/stickers');
    const { stickers } = result.data.data;
    return {
      stickers,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
