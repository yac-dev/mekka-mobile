import { atomFamily } from 'recoil';
import { atomKeys } from '../../../recoil';

// tagのidでatomFamilyを管理する。
export const tagScreenOpenedAtomFamily = atomFamily<boolean, string>({
  key: atomKeys.tagScreenOpened,
  default: false,
});
