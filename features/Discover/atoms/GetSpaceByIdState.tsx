import { atom } from 'recoil';

export const GetSpaceByIdState = atom({
  key: 'GetSpaceByIdState',
  default: {
    status: 'loading',
    data: void 0,
  },
});
