import { axiosClient } from '../axiosClient';

import { UpdateSpaceCheckedInDateInputType } from '../types';

export const updateSpaceCheckedInDate = async (input: UpdateSpaceCheckedInDateInputType) => {
  try {
    await axiosClient.patch(`/spaces/${input.spaceId}/${input.userId}/checkedin`);
  } catch (error) {
    throw error;
  }
};
