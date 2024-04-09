import { ReactionStatus } from '../../types';

export type GetReactionsByPostIdInputType = {
  postId: string;
};

export type GetReactionsByPostIdOutputType = {
  reactionStatuses: ReactionStatus[];
};
