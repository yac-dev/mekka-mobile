import backendAPI from '../../../apis/backend';
import { GetTagsInputType, GetTagsOutputType } from '../types';

export const getTags = async (input: GetTagsInputType): Promise<GetTagsOutputType> => {
  try {
    const result = await backendAPI.get(`/spaces/${input.spaceId}/tags`);

    const { tags } = result.data.data;
    console.log(tags);
    return {
      tags,
    };
  } catch (error) {
    throw error;
  }
};
