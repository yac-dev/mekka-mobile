import { atom } from 'recoil';
import { atomKeys } from '../recoil';
import { SpaceType } from '../types';

export const currentSpaceState = atom<SpaceType | undefined>({
  key: 'currentSpace',
  default: undefined,
});
