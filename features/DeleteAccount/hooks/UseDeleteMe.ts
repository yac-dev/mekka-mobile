import React, { useState } from 'react';
import { deleteMe } from '../apis';
import { ApiResultType, DeleteMeInput } from '../types';

export const useDeleteMe = (input: DeleteMeInput) => {
  const [apiResult, setApiResult] = useState<ApiResultType>({
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

      await deleteMe(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: void 0,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: error.status,
          message: error.message,
        };
      });
      console.log(error);
      //ここ、snackbarを毎回出す感じかな。
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
