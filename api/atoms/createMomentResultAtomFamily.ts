import { atomFamily } from 'recoil';
import { atomKeys } from '../../Recoil';
import { ApiResult } from '../../types';
import { CreateMomentOutputType } from '../../api/types';

// いや、基本はspaceの中だけか使うのは。
// spaceIdでatomFamilyを管理するようにする。
export const createMomentResultAtomFamily = atomFamily<ApiResult<CreateMomentOutputType>, string>({
  key: atomKeys.createMoment,
  default: {
    status: 'idle',
    data: undefined,
  },
});
