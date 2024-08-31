import { AppState, AppStateStatus } from 'react-native';
import { atom } from 'recoil';
import { atomKeys } from '../atomKeys';

export const appStateAtom = atom<AppStateStatus | undefined>({
  key: atomKeys.appState,
  default: AppState.currentState,
});
