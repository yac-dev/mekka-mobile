import { createContext, RefObject } from 'react';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type StickerType = {
  _id: string;
  url: string;
  name: string;
};

type ReactionType = {
  _id: string;
  type: 'emoji' | 'sticker';
  emoji: string | null;
  sticker: StickerType | null;
};

type ReactionStatusType = {
  _id: string;
  post: string;
  reaction: ReactionType;
  count: number;
};

type LocationType = {
  type: string;
  coordinates: number[];
};

type ContentType = {
  _id: string;
  data: string;
  type: string;
  createdBy: string;
  createdAt: string;
};

type PostType = {
  _id: string;
  location: LocationType;
  contents: ContentType[];
  caption: string;
  spaceId: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
};

type ViewPostContextType = {
  posts: PostType;
  setPosts: React.Dispatch<React.SetStateAction<PostType>>;
  reactionStatuses: ReactionStatusType[];
  setReactionStatuses: React.Dispatch<React.SetStateAction<ReactionStatusType[]>>;
  areReactionStatusesFetched: boolean;
  setAreReactionStatusesFetched: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProp<ParamListBase> | undefined;
  menuBottomSheetRef: RefObject<null> | null;
};

export const ViewPostContext = createContext<ViewPostContextType>({
  space: {
    name: '',
  },
  setSpace: () => {},
  posts: [],
  setPosts: () => {},
  reactionStatuses: [],
  setReactionStatuses: () => {},
  areReactionStatusesFetched: false,
  setAreReactionStatusesFetched: () => {},
  navigation: undefined,
  menuBottomSheetRef: null,
});
