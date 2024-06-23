import { atomFamily } from 'recoil';
import { atomKeys } from '../../../Recoil';

// tagのidでatomFamilyを管理する。
export const tagScreenOpenedAtomFamily = atomFamily<boolean, string>({
  key: atomKeys.tagScreenOpened,
  default: false,
});
