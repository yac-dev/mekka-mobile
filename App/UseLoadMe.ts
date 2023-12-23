import { useState } from 'react';
import { loadMe } from './apis';
import { INITIAL_AUTH_STATE, INITIAL_API_ERROR_STATE, AuthDataType, APIStatusType, APIErrorType } from './type';

type ResultType = {
  status: APIStatusType;
  data: AuthDataType;
  error: APIErrorType;
};

export const useLoadMe = () => {
  const [result, setResult] = useState<ResultType>({
    status: 'idle',
    data: INITIAL_AUTH_STATE,
    error: INITIAL_API_ERROR_STATE,
  });

  const fetch = async () => {
    const apiResult = await loadMe();
    setResult({
      status: 'success',
      data: apiResult,
      error: void 0,
    });
  };
};
