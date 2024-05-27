import { useState } from 'react';
import { ApiResultType } from '../../types';
import { UpdateSpaceCheckedInDateInputType } from '../types';
import { updateSpaceCheckedInDate } from '../patch';

export const useUpdateSpaceCheckedInDate = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<void>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: UpdateSpaceCheckedInDateInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      await updateSpaceCheckedInDate(input);
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
