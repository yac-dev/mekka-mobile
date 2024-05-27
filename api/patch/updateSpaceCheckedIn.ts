import backendAPI from '../../apis/backend';
import { UpdateSpaceCheckedInDateInputType } from '../types';

export const updateSpaceCheckedInDate = async (input: UpdateSpaceCheckedInDateInputType) => {
  try {
    const response = await backendAPI.patch(`/spaces/${input.spaceId}/${input.userId}/checkedin`);
  } catch (error) {
    throw error;
  }
};
