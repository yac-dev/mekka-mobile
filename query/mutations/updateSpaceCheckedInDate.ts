import { axiosClient } from '../axiosClient';

import { UpdateSpaceCheckedInDateInputType } from '../types';

export const updateSpaceCheckedInDate = async (input: UpdateSpaceCheckedInDateInputType) => {
  try {
    // /:userId/lastcheckedin
    // /${input.spaceId}
    await axiosClient.patch(`/users/${input.userId}/lastcheckedin`, { spaceId: input.spaceId });
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred updating space checked in date...');
    }
  }
};
