import backendAPI from '../../apis/backend';
import { CreatePostInputType, CreatePostOutputType } from '../types';

export const createPost = async (input: CreatePostInputType): Promise<CreatePostOutputType> => {
  try {
    const filteredCreatedTags = Object.values(input.addedTagsTable.value).filter((element) => element.created);
    const filteredAddedTags = Object.values(input.addedTagsTable.value)
      .filter((element) => !element.created)
      .map((element) => element._id);
    const payload = new FormData();

    payload.append('createdTags', JSON.stringify(filteredCreatedTags));
    payload.append('addedTags', JSON.stringify(filteredAddedTags));
    payload.append('location', JSON.stringify(input.location.value));
    payload.append('disappearAfter', input.disappearAfter);
    payload.append('type', input.postType.value);
    payload.append('caption', input.caption.value);
    payload.append('createdBy', input.userId);
    payload.append('spaceId', input.spaceId);
    payload.append('contents', JSON.stringify(input.contents.value));
    // この段階でcompresorにかけたいよね。。
    input.bufferContents.value.map((content) => {
      payload.append('bufferContents', JSON.parse(JSON.stringify(content)));
    });
    // payload.append('bufferContents', JSON.parse(JSON.stringify(input.bufferContents.value)));
    const result = await backendAPI.post('/posts', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { post, addedTags, createdTags } = result.data.data;
    return {
      post,
      addedTags,
      createdTags,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
