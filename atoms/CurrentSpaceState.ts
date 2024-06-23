import { atom } from 'recoil';
import { atomKeys } from '../Recoil';
import { SpaceType } from '../types';

export const currentSpaceState = atom<SpaceType | undefined>({
  key: 'currentSpace',
  default: undefined,
});
