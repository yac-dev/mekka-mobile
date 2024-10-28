import { axiosClient } from '../axiosClient';
import { CreateSpaceInputType, CreateSpaceOutputType } from '../types';

export const createSpace = async (input: CreateSpaceInputType): Promise<CreateSpaceOutputType> => {
  try {
    const payload = new FormData();
    payload.append('name', input.name.value);
    payload.append('contentType', input.contentType.value);
    payload.append('isPublic', input.isPublic.value.toString()); // ここ、booleanのdata送るのも大変だよな。。。
    payload.append('isCommentAvailable', input.isCommentAvailable.value.toString());
    payload.append('isReactionAvailable', input.isReactionAvailable.value.toString());
    payload.append('reactions', JSON.stringify(input.reactions.value));
    payload.append('videoLength', input.videoLength.value.toString());
    payload.append('disappearAfter', input.disappearAfter.value.toString());
    payload.append('description', input.description.value);
    payload.append('createdBy', JSON.stringify(input.user));
    const iconData = {
      name: `${input.icon.value.split('/').pop().split('.')[0]}.png`,
      uri: input.icon.value,
      type: 'image/jpeg',
    };
    payload.append('icon', JSON.parse(JSON.stringify(iconData)));

    const result = await axiosClient.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
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
