import { useState } from 'react';
import { ApiResultType } from '../../../types';
import { getPostsByTagIdAndRegion } from '../apis';
import { GetPostsByTagIdAndRegionInput, GetPostsByTagIdAndRegionOutput } from '../types';

export const useGetPostsByTagIdAndRegion = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetPostsByTagIdAndRegionOutput>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetPostsByTagIdAndRegionInput) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getPostsByTagIdAndRegion(input);
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
