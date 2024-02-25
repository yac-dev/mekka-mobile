import React, { useState } from 'react';
import { deleteMe } from '../apis';
import { ApiResultType, DeleteMeInput } from '../types';

export const useDeleteMe = () => {
  const [apiResult, setApiResult] = useState<ApiResultType>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  // これさ、stateが変わらない？？？分かんね。。。なぜか。。。
  const requestApi = async (input: DeleteMeInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      await deleteMe(input);
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

  const exec = () => {
    setApiResult((previous) => {
      return {
        ...previous,
        status: 'loading',
      };
    });
  };

  return {
    apiResult,
    requestApi,
    exec,
  };
};
