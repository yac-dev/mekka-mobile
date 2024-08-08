import backendAPI from '../../apis/backend';
import { CreatePushNotificationsInputType } from '../types';

// spaceのidとなんとかをinputに色々やる感じか。
export const createPushNotifications = async (input: CreatePushNotificationsInputType) => {
  try {
    const response = await backendAPI.post(`/notifications`, input);
    return null;
  } catch (error) {
    throw error;
  }
};
