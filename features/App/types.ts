import { AuthType, SpaceAndUserRelationshipType, SpaceUpdatesType, SpaceType } from '../../types';

export type LoadMeInput = {
  jwt: string | undefined;
};

export type LoadMeOutputType = AuthType;

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = {
  mySpaces: SpaceType[];
  updateTable: SpaceUpdatesType;
};

export type GetLogsByUserIdInputType = {
  userId: string;
};

type TagTable = {
  [key: string]: number;
};

export type GetLogsByUserIdOutputType = {
  logs: {
    [key: string]: TagTable;
  };
};
