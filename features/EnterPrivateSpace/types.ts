import { SpaceType } from '../../types';

export type EnterPrivateSpaceInputType = {
  userId: string;
  secretKey: string;
};

export type EnterPrivateSpaceOutputType = {
  space?: SpaceType;
};
