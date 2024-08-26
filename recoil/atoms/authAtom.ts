import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { AuthType } from '../../types';

export const authAtom = atom<AuthType | undefined>({
  key: atomKeys.auth,
  default: undefined,
});
