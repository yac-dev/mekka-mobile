import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { EnterPrivateSpaceInputType, EnterPrivateSpaceOutputType } from '../types';

type useEnterPrivateSpaceOutputType = {
  apiResult: ApiResultType<EnterPrivateSpaceOutputType>;
  requestApi: (input: EnterPrivateSpaceInputType) => void;
};

export const useEnterPrivateSpace = (): useEnterPrivateSpaceOutputType => {
  const [apiResult, setApiResult] = useState<ApiResultType<EnterPrivateSpaceOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = (input: EnterPrivateSpaceInputType) => {};

  return {
    apiResult,
    requestApi,
  };
};
