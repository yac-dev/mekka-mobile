import { useState } from 'react';
import { updateUser } from '../api';
import { ApiResultType, UpdateUserInputType, UpdateUserOutputType } from '../types';

export const useUpdateUser = () => {
  const [apiResult, setApiResult] = useState<ApiResultType>({
    status: 'loading',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: UpdateUserInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });
      const response: UpdateUserOutputType = await updateUser(input);
      setApiResult((previous) => {
        return {
          ...previous,
          data: response,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
