import { axiosClient } from '../axiosClient';
import { CreateMomentInputType, CreateMomentOutputType } from '../types';

export const createMoment = async (input: CreateMomentInputType): Promise<CreateMomentOutputType> => {
  try {
    const payload = new FormData();

    payload.append('disappearAfter', input.disappearAfter);
    payload.append('type', input.postType.value);
    payload.append('caption', input.caption.value);
    payload.append('createdBy', input.userId);
    payload.append('spaceId', input.spaceId);
    payload.append('contents', JSON.stringify(input.contents.value));
    input.bufferContents.value.map((content) => {
      payload.append('bufferContents', JSON.parse(JSON.stringify(content)));
    });
    const result = await axiosClient.post('/posts/moment', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { post } = result.data.data;
    return {
      post,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
