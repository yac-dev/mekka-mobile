import backendAPI from '../../apis/backend';
import { CreateMomentInputType, CreateMomentOutputType } from '../types';

export const createMoment = async (input: CreateMomentInputType): Promise<CreateMomentOutputType> => {
  try {
    const payload = new FormData();

    payload.append('disappearAfter', input.disappearAfter);
    payload.append('type', input.postType.value);
    payload.append('reactions', JSON.stringify(input.reactions));
    payload.append('caption', input.caption.value);
    // payload.append('createdTags', JSON.stringify(filteredCreatedTags));
    // payload.append('addedTags', JSON.stringify(filteredAddedTags));
    // payload.append('location', JSON.stringify(input.location.value));

    // えーと。。。何したいんだっけ？？buffer側は
    const contents = [],
      bufferContents = [];
    input.contents.value.forEach((content) => {
      if (content.type === 'photo') {
        const fileName = `${content.uri.split('/').pop().split('.')[0]}.png`;
        const contentObject = {
          fileName: fileName,
          type: 'photo',
          duration: null,
        };
        contents.push(contentObject);

        const bufferContent = {
          name: fileName,
          uri: content.uri,
          type: 'image/jpg',
        };
        bufferContents.push(bufferContent);
      } else if (content.type === 'video') {
        const fileName = `${content.uri.split('/').pop().split('.')[0]}.mp4`;
        const contentObject = {
          fileName: fileName,
          type: 'video',
          duration: content.duration,
        };

        contents.push(contentObject);
        const bufferContent = {
          name: fileName,
          uri: content.uri,
          type: 'video/mp4',
        };
        bufferContents.push(bufferContent);
      }
    });

    payload.append('createdBy', input.userId);
    payload.append('spaceId', input.spaceId);
    payload.append('contents', JSON.stringify(contents));
    //  ----- 一回ここdebuggingでコメントアウト
    for (let content of input.contents.value) {
      const fileName = `${content.uri.split('/').pop().split('.')[0]}.${content.type === 'photo' ? 'png' : 'mp4'}`;
      const obj = {
        name: fileName,
        uri: content.uri,
        type: content.type === 'photo' ? 'image/jpg' : 'video/mp4',
      };
      payload.append('bufferContents', JSON.parse(JSON.stringify(obj)));
    }
    console.log('payload', payload);
    const result = await backendAPI.post('/posts/moment', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { post } = result.data.data;
    return {
      post,
    };
  } catch (error) {
    throw error;
  }
};
