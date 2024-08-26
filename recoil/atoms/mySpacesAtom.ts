import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { SpaceType } from '../../types';

export const mySpacesAtom = atom<SpaceType[] | undefined>({
  key: atomKeys.mySpaces,
  default: undefined,
});
