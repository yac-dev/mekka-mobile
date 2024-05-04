import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { getMySpaces } from '../apis';
import { GetMySpacesInput, GetMySpacesOutput } from '../types';

export const useGetMySpaces = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetMySpacesOutput>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetMySpacesInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getMySpaces(input);
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

  const requestRefresh = async (input: GetMySpacesInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'refreshing',
        };
      });
      const response = await getMySpaces(input);
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
          message: 'Something went wrong.',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
    requestRefresh,
  };
};
