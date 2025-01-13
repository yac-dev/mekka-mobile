import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { SpaceType, TagType } from '../../types';

//　結局、atomFamilyだとsset時にもidを求められて面倒くさい。。。
// componentの設計に問題があるんじゃね？っていう話でもなくてさ。。。
type CurrentTagsTableBySpaceIdsType = {
  [key: string]: TagType;
};

export const currentTagsTableBySpaceIdsAtom = atom<CurrentTagsTableBySpaceIdsType>({
  key: atomKeys.currentTagsBySpaceIds,
  default: undefined,
});
