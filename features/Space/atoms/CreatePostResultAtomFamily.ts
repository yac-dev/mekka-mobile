import { atomFamily } from 'recoil';
import { atomKeys } from '../../../recoil';
import { ApiResult } from '../../../types';
import { CreatePostOutputType } from '../../../api/types';

// いや、基本はspaceの中だけか使うのは。
// spaceIdでatomを管理するようにする。
export const createPostResultAtomFamily = atomFamily<ApiResult<CreatePostOutputType>, string>({
  key: atomKeys.createPost,
  default: {
    status: 'idle',
    data: undefined,
  },
});
