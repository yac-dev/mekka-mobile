import { ApiResult, PostType, SpaceType } from '../../types';
import { CreatePostInputType, CreatePostOutputType } from '../types';
import { createPost } from '../post';
import { useRecoilState } from 'recoil';
import { createPostResultAtomFamily, getMomentsBySpaceIdResultAtomFamily } from '../atoms';
import { getMomentsBySpaceId } from '../apis';
import { GetMomentsBySpaceIdInputType } from '../types';

export const useGetMomentsBySpaceIdResult = (space: SpaceType) => {
  const [getMomentsBySpaceIdResult, setGetMomentsBySpaceIdResult] = useRecoilState(
    getMomentsBySpaceIdResultAtomFamily(space._id)
  );

  const requestGetMomentsBySpaceId = async (input: GetMomentsBySpaceIdInputType) => {
    try {
      setGetMomentsBySpaceIdResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getMomentsBySpaceId(input);
      setGetMomentsBySpaceIdResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setGetMomentsBySpaceIdResult((previous) => {
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
  const addCreatedMoment = (createdPost: PostType) => {
    setGetMomentsBySpaceIdResult((previous) => {
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

  return {
    requestGetMomentsBySpaceId,
    addCreatedMoment,
  };
};
