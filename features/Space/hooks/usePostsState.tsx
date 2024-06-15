import { useState } from 'react';
import { ApiResultType, AuthType, PostType } from '../../../types';
import { getPosts } from '../apis';
import { GetPostsInputType, GetPostsOutputType } from '../types';
import { postsAtom } from '../atoms';
import { useRecoilState } from 'recoil';

// page開くたびにapi request支度ないからさ。それを防がないとな。。。
export const useGetPostsByTagIdResult = (tagId: string) => {
  const [getPostsResult, setGetPostsResult] = useRecoilState(postsAtom(tagId));

  const requestApi = async (input: GetPostsInputType) => {
    try {
      setGetPostsResult((previous) => {
        return {
          ...previous,
          status: 'loading',
          data: undefined,
        };
      });

      const response = await getPosts(input);
      setGetPostsResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: [{ o: 'a' }],
        };
      });
    } catch (error) {
      setGetPostsResult((previous) => {
        return {
          ...previous,
          status: 'fail',
          data: void 0,
        };
      });
    }
  };

  // const requestRefresh = async (input: GetPostsInputType) => {
  //   try {
  //     setApiResult((previous) => {
  //       return {
  //         ...previous,
  //         status: 'refreshing',
  //       };
  //     });

  //     const response = await getPosts(input);
  //     console.log('refreshed');
  //     setApiResult((previous) => {
  //       return {
  //         ...previous,
  //         status: 'success',
  //         data: response,
  //       };
  //     });
  //   } catch (error) {
  //     setApiResult((previous) => {
  //       return {
  //         ...previous,
  //         status: 'fail',
  //         data: void 0,
  //       };
  //     });
  //   }
  // };

  const addCreatedPost = (createdPost: PostType) => {
    setGetPostsResult((previous) => {
      const previousPosts = [createdPost, ...(previous.data?.posts || [])];
      // このunshiftとか、push methodって、最終的なarrayのlengthを返す仕様らしい。。。

      return {
        ...previous,
        status: 'success',
        data: {
          ...previous.data,
          posts: previousPosts,
        },
      };
    });
  };

  // const loadMore = async (input: GetPostsInputType) => {
  //   try {
  //     setPosts((previous) => {
  //       return {
  //         ...previous,
  //         status: 'paging',
  //       };
  //     });

  //     const response = await getPosts(input);
  //     setApiResult((previous) => {
  //       return {
  //         ...previous,
  //         status: 'success',
  //         data: response,
  //       };
  //     });
  //   } catch (error) {
  //     setApiResult((previous) => {
  //       return {
  //         ...previous,
  //         status: 'fail',
  //         data: void 0,
  //       };
  //     });
  //   }
  // };

  return {
    // apiResult,
    // requestApi,
    // requestRefresh,
    // loadMore,
    getPostsResult,
    addCreatedPost,
  };
};
