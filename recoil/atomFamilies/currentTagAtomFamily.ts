import { atomFamily } from 'recoil';
import { atomKeys } from '../atomKeys';
import { TagType } from '../../types';
import { mySpacesAtom } from '../atoms';
import { useRecoilValue } from 'recoil';
export const currentTagAtomFamily = atomFamily<TagType | undefined, string>({
  key: atomKeys.currentTagBySpaceId,
  // default: () => {
  //   const spaces = useRecoilValue(mySpacesAtom);

  // },
});
