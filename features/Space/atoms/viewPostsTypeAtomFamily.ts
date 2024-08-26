import { atom } from 'recoil';
import { atomKeys } from '../../../recoil';
import { atomFamily } from 'recoil';

export type ViewPostsTypeType = 'grid' | 'region';

// これは逆にspaceのidごとに持っておく方がいいのかもな。。。
// stringはspaceのidのことね。
export const viewPostsTypeAtomFamily = atomFamily<ViewPostsTypeType, string>({
  key: 'viewPostsType',
  default: 'grid',
});
