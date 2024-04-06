import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { getPosts } from '../apis';
import { GetPostsInputType, GetPostsOutputType } from '../types';

export const useGetPosts = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetPostsOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetPostsInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getPosts(input);
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

  const loadMore = async (input: GetPostsInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'paging',
        };
      });

      const response = await getPosts(input);
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
    loadMore,
  };
};
