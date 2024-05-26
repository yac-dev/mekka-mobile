import { atom } from 'recoil';
import { selector } from 'recoil';
import { ApiResultType } from '../../../types';
import { GetSpaceByIdOutputType } from '../types';

export const GetSpaceByIdState = atom<ApiResultType<GetSpaceByIdOutputType>>({
  key: 'GetSpaceByIdAtom',
  default: {
    status: 'loading',
    data: void 0,
    message: '',
  },
});

// status関連は、useLoadable使うよりも自前で実装したほうがいいだろな。多分
