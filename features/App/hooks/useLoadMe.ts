import React, { useState } from 'react';
import { loadMe } from '../apis/loadMe';
import { ApiResultType } from '../types';

export const useLoadMe = () => {
  const [apiResult, setApiResult] = useState<ApiResultType>({
    status: 'loading',
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

      const response = await loadMe();
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      //ここ、snackbarを毎回出す感じかな。
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
          data: void 0,
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
