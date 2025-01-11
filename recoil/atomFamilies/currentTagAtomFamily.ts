import { atomFamily } from 'recoil';
import { atomKeys } from '../atomKeys';
import { TagType } from '../../types';

export const currentTagAtomFamily = atomFamily<TagType | undefined, string>({
  key: atomKeys.currentTagBySpaceId,
  default: undefined,
});
