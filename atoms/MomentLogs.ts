import { atom } from 'recoil';
import { atomKeys } from '../Recoil';
import { MomentLogsType } from '../types';

export const momentLogsAtom = atom<MomentLogsType>({
  key: atomKeys.momentLogs,
  default: {},
});
