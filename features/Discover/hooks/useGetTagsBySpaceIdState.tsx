import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { GetTagsBySpaceIdInputType, GetTagsBySpaceIdOutputType } from '../types';
import { getTagsBySpaceId } from '../apis';

type useGetSpacesStateOutputType = {
  apiResult: ApiResultType<GetTagsBySpaceIdOutputType>;
  requestApi: (input: GetTagsBySpaceIdInputType) => void;
};

export const useGetSpacesState = (): useGetSpacesStateOutputType => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetTagsBySpaceIdOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetTagsBySpaceIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });
      const response = await getTagsBySpaceId(input);
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
