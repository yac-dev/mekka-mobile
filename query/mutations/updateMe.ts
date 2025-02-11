import { axiosClient } from '../axiosClient';
import { UpdateMeInputType, UpdateMeOutputType } from '../types';

export const updateMe = async (input: UpdateMeInputType): Promise<UpdateMeOutputType> => {
  try {
    const payload = new FormData();
    if (input.name) {
      payload.append('name', input.name);
    }
    if (input.email) {
      payload.append('email', input.email);
    }
    if (input.avatar) {
      const avatarData = {
        name: `${input.avatar.split('/').pop().split('.')[0]}.png`,
        uri: input.avatar,
        type: 'image/jpeg',
      };
      payload.append('avatar', JSON.parse(JSON.stringify(avatarData)));
    }
    const result = await axiosClient.patch(`/auth/${input.userId}`, payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { user } = result.data.data;
    return user;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred during loading your data...');
    }
  }
};
