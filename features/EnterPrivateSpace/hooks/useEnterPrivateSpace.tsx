import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { EnterPrivateSpaceInputType, EnterPrivateSpaceOutputType } from '../types';
import { enterPrivateSpace } from '../apis';

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

  const requestApi = async (input: EnterPrivateSpaceInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });
      const response = await enterPrivateSpace(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
          data: void 0,
          message: 'OOPS. Something went wrong.',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
