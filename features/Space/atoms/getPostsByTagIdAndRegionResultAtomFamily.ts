import { atom, atomFamily, selectorFamily } from 'recoil';
import { atomKeys } from '../../../Recoil';
import { PostType } from '../../../types';
import { ApiResult } from '../../../types';
import { getPostsByTagId } from '../../../api';
import { GetPostsByTagIdAndRegionOutput } from '../../../api/types';

export const getPostsByTagIdAndRegionResultAtomFamily = atomFamily<ApiResult<GetPostsByTagIdAndRegionOutput>, string>({
  key: atomKeys.postsByTagIdAndRegion,
  default: {
    status: 'loading',
    data: undefined,
  },
});
