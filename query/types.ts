import { SpaceType, AuthType } from '../types';

export type LoadMeInput = {
  jwt: string | undefined;
};

export type LoadMeOutputType = AuthType;

export type GetMySpacesInput = {
  userId: string;
};

export type GetMySpacesOutput = {
  mySpaces: SpaceType[];
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
  momentLogs: {
    [key: string]: number;
  };
};

export type UpdateSpaceCheckedInDateInputType = {
  spaceId: string;
  userId: string;
};
