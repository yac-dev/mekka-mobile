import { useState } from 'react';
import { ApiResultType } from '../../../types';
import { GetMomentPostsInputType, GetMomentPostsOutputType } from '../type';
import { getMomentPosts } from '../apis/getMomentPosts';

type useGetMomentPostsOutputType = {
  apiResult: ApiResultType<GetMomentPostsOutputType>;
  requestApi: (input: GetMomentPostsInputType) => void;
};

export const useGetMomentPosts = (): useGetMomentPostsOutputType => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetMomentPostsOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetMomentPostsInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getMomentPosts(input);

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
          message: 'OPPS. Something went wrong.',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
