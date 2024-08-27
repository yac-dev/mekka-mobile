import { SpaceType, SpaceUpdatesType } from '../types';

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = {
  mySpaces: SpaceType[];
  updateTable: SpaceUpdatesType;
};
