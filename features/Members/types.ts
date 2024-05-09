import { UserType } from '../../types';

export type GetMembersBySpaceIdInputType = {
  spaceId: string;
};

export type GetMembersBySpaceIdOutputType = {
  users: UserType[];
};
