import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';

export const isPushNotificationEnabledAtom = atom<boolean>({
  key: atomKeys.isPushNotificationEnabled,
  default: false,
});
