// tag id毎にpostsのpaginationのpageを管理するやつ。
import { atomFamily } from 'recoil';
import { atomKeys } from '..';

export const currentPostsPageByTagIdAtomFamily = atomFamily<number, string>({
  key: atomKeys.currentPostsPageByTagId,
  default: 0,
});
