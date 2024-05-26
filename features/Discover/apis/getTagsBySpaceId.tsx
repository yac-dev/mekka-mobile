import backendAPI from '../../../apis/backend';
import { GetTagsBySpaceIdInputType, GetTagsBySpaceIdOutputType } from '../types';

export const getTagsBySpaceId = async (input: GetTagsBySpaceIdInputType): Promise<GetTagsBySpaceIdOutputType> => {
  try {
    const result = await backendAPI.get(`/spaces/${input.spaceId}/tags`);
    const { tags } = result.data.data;
    return {
      tags,
    };
  } catch (error) {
    throw error;
  }
};
