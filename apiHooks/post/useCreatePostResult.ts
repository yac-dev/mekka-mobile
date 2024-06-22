import { useState } from 'react';
import { ApiResult } from '../../types';
import { CreatePostInputType, CreatePostOutputType } from '../../api/types';
import { createPost } from '../../api/post';

export const useCreatePost = () => {
  const [apiResult, setApiResult] = useState<ApiResult<CreatePostOutputType>>({
    status: 'idle',
    data: void 0,
  });

  const requestApi = async (input: CreatePostInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
          data: undefined,
        };
      });

      const response = await createPost(input);
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
          status: 'error',
          data: void 0,
          message: 'OOPS. Something went wrong...',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
