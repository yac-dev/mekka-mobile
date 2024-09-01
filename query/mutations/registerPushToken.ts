import { axiosClient } from '../axiosClient';

import { RegisterPushTokenInputType } from '../types';

export const registerPushToken = async (input: RegisterPushTokenInputType) => {
  try {
    await axiosClient.patch(`/auth/${input.userId}/pushToken`, { pushToken: input.pushToken });
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred registering your push token...');
    }
  }
};
