import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { CreateMomentInputType, CreateMomentOutputType } from '../types';
import { createMoment } from '../apis/createMoment';

export const useCreateMoment = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<CreateMomentOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: CreateMomentInputType) => {
    try {
      console.log('heeeey moment');
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await createMoment(input);
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
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
