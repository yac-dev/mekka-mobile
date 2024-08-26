import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';
import { LogsTableType } from '../../types';

export const logsTableAtom = atom<LogsTableType | undefined>({
  key: atomKeys.logsTable,
  default: undefined,
});
