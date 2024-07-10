import { atomFamily } from 'recoil';
import { atomKeys } from '../../Recoil';
import { ApiResult } from '../../types';
import { GetReactionsByPostIdOutputType } from '../../api/types';

// spaceIdでatomFamilyを管理するようにする。
export const getReactionsByPostIdResultAtomFamily = atomFamily<ApiResult<GetReactionsByPostIdOutputType>, string>({
  key: atomKeys.getReactionsByPostId,
  default: {
    status: 'loading',
    data: undefined,
  },
});
