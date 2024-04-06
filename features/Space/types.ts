import { PostType, TagType, MapRegionType } from '../../types';

export type GetTagsInputType = {
  spaceId: string;
};

export type GetTagsOutputType = {
  tags: TagType[];
};

export type GetPostsInputType = {
  tagId: string;
  currentPage: number;
};

export type GetPostsOutputType = {
  posts: PostType[];
  nextPage: number | null;
};

export type GetPostsByTagIdAndRegionInput = {
  tagId: string;
  region: MapRegionType;
};

export type GetPostsByTagIdAndRegionOutput = {
  posts: PostType[];
};
