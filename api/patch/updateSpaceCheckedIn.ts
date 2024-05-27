import backendAPI from '../../apis/backend';
import { UpdateSpaceCheckedInDateInputType } from '../types';

export const updateSpaceCheckedInDate = async (input: UpdateSpaceCheckedInDateInputType) => {
  try {
    await backendAPI.patch(`/spaces/${input.spaceId}/${input.userId}/checkedin`);
  } catch (error) {
    throw error;
  }
};
