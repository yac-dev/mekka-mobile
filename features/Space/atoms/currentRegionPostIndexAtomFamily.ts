import { atomFamily } from 'recoil';
import { atomKeys } from '../../../Recoil';
import { PostType } from '../../../types';

// tagのidでatomを作るようにする。
export const currentRegionPostIndexAtomFamily = atomFamily<PostType, string>({
  key: atomKeys.currentRegionPostIndex,
  default: undefined,
});
