import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { GetSpacesOutputType } from '../types';
import { getSpaces } from '../apis';

type useGetSpacesStateOutputType = {
  apiResult: ApiResultType<GetSpacesOutputType>;
  requestApi: () => void;
};

export const useGetSpacesOutputType = (): useGetSpacesStateOutputType => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetSpacesOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async () => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });
      const response = await getSpaces();
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
