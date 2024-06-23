import { useState } from 'react';
import { ApiResult, SpaceType } from '../../types';
import { CreatePostInputType, CreatePostOutputType } from '../../api/types';
import { createPost } from '../../api/post';
import { useRecoilState } from 'recoil';
import { createPostResultAtomFamily } from '../../features/Space/atoms/CreatePostResultAtomFamily';

type IUseCreatePost = {
  space: SpaceType;
};

export const useCreatePostResult = ({ space }: IUseCreatePost) => {
  const [createPostResult, setCreatePostResult] = useRecoilState(createPostResultAtomFamily(space._id));

  const requestApi = async (input: CreatePostInputType) => {
    try {
      setCreatePostResult((previous) => {
        return {
          ...previous,
          status: 'loading',
          data: undefined,
        };
      });

      const response = await createPost(input);
      setCreatePostResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setCreatePostResult((previous) => {
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
    requestApi,
  };
};
