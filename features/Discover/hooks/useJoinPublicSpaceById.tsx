import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { JoinPublicSpaceByIdInputType, JoinPublicSpaceByIdOutputType } from '../types';
import { joinPublicSpaceById } from '../apis/joinPublicSpaceById';

type UseJoinPublicSpaceByIdStateOutputType = {
  apiResult: ApiResultType<JoinPublicSpaceByIdOutputType>;
  requestApi: (input: JoinPublicSpaceByIdInputType) => void;
};

export const useJoinPublicSpaceByIdState = (): UseJoinPublicSpaceByIdStateOutputType => {
  const [apiResult, setApiResult] = useState<ApiResultType<JoinPublicSpaceByIdOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: JoinPublicSpaceByIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });
      const response = await joinPublicSpaceById(input);
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
