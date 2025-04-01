import { axiosClient } from '../axiosClient';
import { GetNotificationByUserIdInput, GetNotificationByUserIdOutput } from '../types';

export const getNotificationByUserId = async (
  input: GetNotificationByUserIdInput
): Promise<GetNotificationByUserIdOutput> => {
  try {
    const result = await axiosClient.get(`/users/${input.userId}/notifications?page=${input.currentPage}`);
    const { notifications, currentPage, hasNextPage } = result.data.data;
    return {
      notifications,
      currentPage,
      hasNextPage,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
