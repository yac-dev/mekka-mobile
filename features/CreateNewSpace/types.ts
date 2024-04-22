import { SpaceType } from '../../types';
import { FormDataType } from './contexts/CreateNewSpaceProvider';

type UserDataPayloadType = {
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
};

export type CreateSpaceInputType = FormDataType & UserDataPayloadType;

export type CreateSpaceOutputType = {
  space: SpaceType;
};
