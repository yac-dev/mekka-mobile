import { atomFamily } from 'recoil';
import { atomKeys } from '../../Recoil';
import { ApiResult } from '../../types';
import { GetMomentsBySpaceIdOutputType } from '../../api/types';

// spaceIdでatomFamilyを管理するようにする。
export const getMomentsBySpaceIdResultAtomFamily = atomFamily<ApiResult<GetMomentsBySpaceIdOutputType>, string>({
  key: atomKeys.getMoments,
  default: {
    status: 'loading',
    data: undefined,
  },
});
