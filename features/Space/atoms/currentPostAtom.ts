import { atom } from 'recoil';
import { atomKeys } from '../../../recoil';
import { PostType } from '../../../types';

export const currentPostAtom = atom<PostType>({
  key: atomKeys.currentPost,
  default: undefined,
});
