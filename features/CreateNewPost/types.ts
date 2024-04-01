import { PostType, TagType } from '../../types';

export type CreatePostInputType = {
  disappearAfter: string;
  type: string;
  reactions: string; // JSON string
  caption: string;
  createdTags: string; // JSON string
  addedTags: string; // JSON string
  location: string; // JSON string
  createdLocationTag?: string; // JSON string, optional
  addedLocationTag?: string; // JSON string, optional
  createdBy: string;
  spaceId: string;
  contents: string; // JSON string
  // Define other fields if necessary
};

export type CreatePostOutputType = {
  post: PostType;
  addedTags: TagType[];
  createdTags?: TagType[];
};
