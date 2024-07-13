import { getReactionsByPostId } from '../apis';
import { GetReactionsByPostIdInputType } from '../types';
import { getReactionsByPostIdResultAtomFamily } from '../atoms';
import { useRecoilState } from 'recoil';

export const useGetReactionsByPostIdResult = (postId: string) => {
  const [getReactionsByPostIdResult, setGetReactionsByPostIResult] = useRecoilState(
    getReactionsByPostIdResultAtomFamily(postId)
  );

  const requestGetReactionsBySpaceId = async (input: GetReactionsByPostIdInputType) => {
    try {
      setGetReactionsByPostIResult((previous) => {
        if (previous.status !== 'success') {
          return {
            ...previous,
            status: 'loading',
          };
        }
        return previous;
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

  // createしたreactionをここに足していく感じだよな。
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
    requestGetReactionsBySpaceId,
  };
};
