import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { SpaceType } from '../../types';

export const currentSpaceState = atom<SpaceType[] | undefined>({
  key: atomKeys.mySpaces,
  default: undefined,
});
