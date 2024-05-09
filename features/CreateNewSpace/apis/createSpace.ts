import backendAPI from '../../../apis/backend';
import { CreateSpaceInputType, CreateSpaceOutputType } from '../types';

export const createSpace = async (input: CreateSpaceInputType): Promise<CreateSpaceOutputType> => {
  try {
    // inputからformDataを作る。formDataの型も作りたいが今はパス。
    const payload = new FormData();
    payload.append('name', input.name.value);
    payload.append('contentType', input.contentType.value);
    payload.append('isPublic', input.isPublic.value.toString()); // ここ、booleanのdata送るのも大変だよな。。。
    payload.append('isCommentAvailable', input.isCommentAvailable.value.toString());
    payload.append('isReactionAvailable', input.isReactionAvailable.value.toString());
    payload.append('reactions', JSON.stringify(input.reactions.value));
    payload.append('videoLength', input.videoLength.value.toString());
    payload.append('disappearAfter', input.disappearAfter.value.toString());
    payload.append('description', input.description.value);
    payload.append('createdBy', JSON.stringify(input.user));
    const iconData = {
      name: `${input.icon.value.split('/').pop().split('.')[0]}.png`,
      uri: input.icon.value,
      type: 'image/jpeg',
    };
    payload.append('icon', JSON.parse(JSON.stringify(iconData)));

    const result = await backendAPI.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    // このdata propertyをbackend側で返していなかったが故にエラー詰まったこういうのでも、throw errorが働くのか。。。。。。。ここら辺のdebuggingがなー。ここら辺の保守性をもっと極められればな。。。
    const { space } = result.data.data;
    return {
      space,
    };
  } catch (error) {
    throw error;
  }
};

// 参考
//   type CreateSpaceInputFields =
//   | 'name'
//   | 'contentType'
//   | 'isPublic'
//   | 'isCommentAvailable'
//   | 'isReactionAvailable'
//   | 'reactions'
//   | 'videoLength'
//   | 'disappearAfter'
//   | 'description'
//   | 'createdBy'
//   | 'icon'
//   | 'voehgiwepjpwe';

// export interface FormDataType extends FormData {
//   append(name: CreateSpaceInputFields, value: string | Blob, fileName?: string): void;
// }
