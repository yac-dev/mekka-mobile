import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { TagType } from '../../types';

export const currentTagAtom = atom<TagType | undefined>({
  key: atomKeys.currentTag,
  default: undefined,
});
