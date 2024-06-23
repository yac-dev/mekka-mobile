import { useState } from 'react';
import { ApiResult, SpaceType } from '../../types';
import { CreatePostInputType, CreatePostOutputType } from '../types';
import { createPost } from '../post';
import { useRecoilState } from 'recoil';
import { createPostResultAtomFamily } from '../atoms';

type IUseCreatePost = {
  space: SpaceType;
};

export const useCreatePostResult = (space: SpaceType) => {
  const [createPostResult, setCreatePostResult] = useRecoilState(createPostResultAtomFamily(space._id));

  const requestCreatePost = async (input: CreatePostInputType) => {
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
    requestCreatePost,
  };
};
