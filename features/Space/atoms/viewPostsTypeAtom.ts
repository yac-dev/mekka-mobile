import { atom } from 'recoil';
import { atomKeys } from '../../../Recoil';

export type ViewPostsTypeType = 'grid' | 'map';

export const viewPostsTypeAtom = atom<ViewPostsTypeType>({
  key: 'viewPostsType',
  default: 'grid',
});
