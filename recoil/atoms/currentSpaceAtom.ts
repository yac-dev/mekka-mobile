import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { SpaceType } from '../../types';

export const currentSpaceAtom = atom<SpaceType | undefined>({
  key: atomKeys.currentSpace,
  default: undefined,
});
