import { atom } from 'recoil';
import { atomFamily } from 'recoil';
import { atomKeys } from '../../../Recoil';
import { MapRegionType, PostType } from '../../../types';

export const currentRegionAtomFamily = atomFamily<MapRegionType, string>({
  key: atomKeys.currentRegion,
  default: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 100.0922,
    longitudeDelta: 100.0421,
  },
});
