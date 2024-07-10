import { useState } from 'react';
import { ApiResultType } from '../../types';
import { getReactionsByPostId } from '../apis';
import { GetReactionsByPostIdInputType } from '../types';
import { getReactionsByPostIdResultAtomFamily } from '../atoms';
import { useRecoilState } from 'recoil';

// いやrecoil使おうかな。
export const useGetReactionsByPostIdResult = (postId: string) => {
  const [getReactionsByPostIdResult, setGetReactionsByPostIResult] = useRecoilState(
    getReactionsByPostIdResultAtomFamily(postId)
  );

  const requestGetMomentsBySpaceId = async (input: GetReactionsByPostIdInputType) => {
    try {
      setGetReactionsByPostIResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getReactionsByPostId(input);
      setGetReactionsByPostIResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setGetReactionsByPostIResult((previous) => {
        return {
          ...previous,
          status: 'error',
          data: void 0,
          message: 'OOPS. Something went wrong...',
        };
      });
    }
  };

  // addする。
  // const addCreatedMoment = (createdPost: PostType) => {
  //   setGetMomentsBySpaceIdResult((previous) => {
  //     const previousPosts = [createdPost, ...(previous.data?.posts || [])];
  //     // このunshiftとか、push methodって、最終的なarrayのlengthを返す仕様らしい。。。
  //     return {
  //       ...previous,
  //       status: 'success',
  //       data: {
  //         ...previous.data,
  //         posts: previousPosts,
  //       },
  //     };
  //   });
  // };

  return {
    getReactionsByPostIdResult,
    requestGetMomentsBySpaceId,
  };
};
