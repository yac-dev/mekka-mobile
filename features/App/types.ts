import { AuthType, SpaceAndUserRelationshipType, SpaceUpdatesType, SpaceType } from '../../types';

export type LoadMeOutputType = AuthType;

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = {
  spaces: SpaceType[];
  updateTable: SpaceUpdatesType;
};