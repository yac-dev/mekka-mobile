import backendAPI from '../../../apis/backend';
import { CreatePostInputType, CreatePostOutputType } from '../types';

export const createPost = async (input: CreatePostInputType): Promise<CreatePostOutputType> => {
  try {
    const result = await backendAPI.post('/posts', input, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { post, addedTags, createdTags } = result.data.data;
    return {
      post,
      addedTags,
      createdTags,
    };
  } catch (error) {
    throw error;
  }
};
