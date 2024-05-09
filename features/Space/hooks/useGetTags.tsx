import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { getTags } from '../apis';
import { GetTagsInputType, GetTagsOutputType } from '../types';

export const useGetTags = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetTagsOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetTagsInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getTags(input);
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
