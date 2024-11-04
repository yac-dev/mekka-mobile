import { axiosClient } from '../axiosClient';
import { PreviewStickerInputType, PreviewStickerOutputType } from '../types';

// これは外側で作ることにする。
// const fileName = `${input.userId}_${new Date().getTime()}`;
// const iconData = {
//   name: `${fileName}.webp`,
//   uri: input.uri,
//   type: input.type,
// };
export const previewSticker = async (input: PreviewStickerInputType): Promise<PreviewStickerOutputType> => {
  try {
    const payload = new FormData();

    payload.append('originalStickerImage', JSON.parse(JSON.stringify(input.content)));
    const result = await axiosClient.post('/stickers/preview', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { image } = result.data.data;
    return {
      image,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
