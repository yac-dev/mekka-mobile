import { atom } from 'recoil';
import { atomKeys } from '../../../Recoil';
import { PostType } from '../../../types';

export const screenLoadedAtom = atom<PostType>({
  key: atomKeys.currentPost,
  default: undefined,
});
