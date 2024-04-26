import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { GetTagIconsInputType, GetTagIconsOutputType } from '../types';
import { getTagIcons } from '../apis';

export const useGetTagIcons = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetTagIconsOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetTagIconsInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getTagIcons(input);
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
