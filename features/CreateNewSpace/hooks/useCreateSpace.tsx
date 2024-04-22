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

  // これさ、stateが変わらない？？？分かんね。。。なぜか。。。
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
          data: void 0,
        };
      });
    } catch (error) {
      // 本当は、これapiからきたerror objectを使いたいが。。。分からん。
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
        };
      });
    } finally {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'idling',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
