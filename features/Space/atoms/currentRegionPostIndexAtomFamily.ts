import { atomFamily } from 'recoil';
import { atomKeys } from '../../../recoil';
import { PostType } from '../../../types';

// tagのidでatomを作るようにする。
export const currentRegionPostIndexAtomFamily = atomFamily<PostType, string>({
  key: atomKeys.currentRegionPostIndex,
  default: undefined,
});
