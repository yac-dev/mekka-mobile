import backendAPI from '../../../apis/backend';
import { GetTagIconsInputType, GetTagIconsOutputType } from '../types';

export const getTagIcons = async (input: GetTagIconsInputType): Promise<GetTagIconsOutputType> => {
  try {
    const result = await backendAPI.get(`/icons?name=${input.name}`);
    const { icon } = result.data.data;
    return {
      icon,
    };
  } catch (error) {
    throw error;
  }
};
