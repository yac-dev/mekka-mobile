import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { UserType } from '../../types';

export const currentUserAtom = atom<UserType | undefined>({
  key: atomKeys.currentUser,
  default: undefined,
});
