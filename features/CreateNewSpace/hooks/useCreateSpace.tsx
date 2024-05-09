import React, { useState } from 'react';
import { createSpace } from '../apis';
import { ApiResultType } from '../../../types';
import { CreateSpaceInputType, CreateSpaceOutputType } from '../types';

export const useCreateSpace = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<CreateSpaceOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: CreateSpaceInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await createSpace(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
          error: void 0,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
