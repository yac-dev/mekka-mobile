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

  //
  const addReaction = (reactionId: string) => {
    setGetReactionsByPostIResult((previous) => {
      const previousReactions = previous.data?.reactions || [];
      // const reaction = previousReactions.find((reaction) => reaction._id === reactionId);
      const newReactions = previousReactions.map((reaction) => {
        if (reaction._id === reactionId) {
          return { ...reaction, count: reaction.count + 1 };
        }
        return reaction;
      });
      return {
        ...previous,
        data: {
          ...previous.data,
          reactions: newReactions,
        },
      };
    });
  };

  return {
    getReactionsByPostIdResult,
    requestGetReactionsBySpaceId,
    addReaction,
  };
};
