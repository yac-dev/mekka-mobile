import { useState } from 'react';
import { ApiResultType, AuthType, PostType } from '../../../types';
import { getPosts } from '../apis';
import { GetPostsInputType, GetPostsOutputType } from '../types';
import { getPostsByTagIdAtomFamily } from '../atoms';
import { useRecoilState } from 'recoil';
import { GetPostsByTagIdInputType } from '../../../api/types';

// page開くたびにapi request支度ないからさ。それを防がないとな。。。
export const useGetPostsByTagId = (tagId: string) => {
  // 正直、resultの方はいらないんだわな。だって、atomの方を消費するようにすればいいから。
  const [getPostsByTagIdResult, setGetPostsByTagIdResult] = useRecoilState(getPostsByTagIdAtomFamily(tagId));

  // currentPageもdefaultで持っておいた方がいいわな。
  // pagingも必要だけど、
  // 最初の1回目のrequestはあるんだが、画面閉じてその後に戻ってきた後にcurrentPageをそのまま使いたいわけよ。queryするから。その後用のpaginationも含めてな。
  // いや、やっぱあれか、dataのpostsがある場合には、curretnPageを使うとかそういうやり方かね。
  const requestGetPostsByTagId = async (input: GetPostsByTagIdInputType) => {
    try {
      setGetPostsByTagIdResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getPosts(input);
      setGetPostsByTagIdResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      // setGetPostsResult((previous) => {
      //   return {
      //     ...previous,
      //     status: 'fail',
      //     data: void 0,
      //   };
      // });
    }
  };

  // !hasNextPageなら、そもqueryしないようにする。
  const requestMorePostsByTagId = async (input: GetPostsByTagIdInputType) => {
    setGetPostsByTagIdResult((previous) => {
      return {
        ...previous,
        status: 'paging',
      };
    });
    const inputObject = {
      tagId: input.tagId,
      currentPage: getPostsByTagIdResult.data.currentPage,
    };
    const response = await getPosts(inputObject);

    setGetPostsByTagIdResult((previous) => {
      const previousPosts = [...previous.data.posts, ...response.posts];
      const data = {
        posts: previousPosts,
        currentPage: response.currentPage,
        hasNextPage: response.hasNextPage,
      };
      return {
        ...previous,
        status: 'success',
        data,
      };
    });
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
    setGetPostsByTagIdResult((previous) => {
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
    requestGetPostsByTagId,
    requestMorePostsByTagId,
    addCreatedPost,
  };
};
