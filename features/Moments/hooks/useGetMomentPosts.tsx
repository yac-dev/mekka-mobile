import { useState } from 'react';
import { ApiResultType, PostType } from '../../../types';
import { GetMomentPostsInputType, GetMomentPostsOutputType } from '../type';
import { getMomentPosts } from '../apis/getMomentPosts';

type useGetMomentPostsOutputType = {
  apiResult: ApiResultType<GetMomentPostsOutputType>;
  requestApi: (input: GetMomentPostsInputType) => void;
  addCreatedMoment: (post: PostType) => void;
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

  const addCreatedMoment = (post: PostType) => {
    setApiResult((previous) => {
      // const updatedPosts = [...previous.data?.posts].unshift(post);
      // NOTE: ↑unshift(pushも)注意な。pushすると、lengthを返す。pushはmutationだしな。
      const updatedPosts = [...previous.data?.posts];
      updatedPosts.unshift(post);
      return {
        ...previous,
        data: {
          ...previous.data,
          posts: updatedPosts,
        },
      };
    });
  };

  return {
    apiResult,
    requestApi,
    addCreatedMoment,
  };
};
