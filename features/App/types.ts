import { AuthType, SpaceAndUserRelationshipType } from '../../types';

export type LoadMeOutputType = {
  user: AuthType;
};

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = SpaceAndUserRelationshipType;
