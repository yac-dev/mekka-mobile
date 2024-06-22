import { atomFamily } from 'recoil';
import { atomKeys } from '../../../Recoil';
import { PostType } from '../../../types';

// tagのidでatomを作るようにする。
export const currentPostAtomFamily = atomFamily<PostType, string>({
  key: atomKeys.currentPostIndex,
  default: undefined,
});
