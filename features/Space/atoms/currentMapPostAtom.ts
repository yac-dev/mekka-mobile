import { atom } from 'recoil';
import { atomKeys } from '../../../recoil';
import { PostType } from '../../../types';

export const currentMapPostAtom = atom<PostType>({
  key: atomKeys.currentMapPost,
  default: undefined,
});
