import { atom } from 'recoil';
import { selector } from 'recoil';
import { ApiResultType, SpaceType } from '../../../types';

export const GetSpaceByIdState = atom<ApiResultType<SpaceType>>({
  key: 'GetSpaceByIdState',
  default: {
    status: 'loading',
    data: void 0,
    message: '',
  },
});

// status関連は、useLoadable使うよりも自前で実装したほうがいいだろな。多分
