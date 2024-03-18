import { AuthType, SpaceAndUserRelationshipType, SpaceUpdatesType } from '../../types';

export type LoadMeOutputType = AuthType;

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = {
  spaceAndUserRelationships: SpaceAndUserRelationshipType[];
  updateTable: SpaceUpdatesType;
};
