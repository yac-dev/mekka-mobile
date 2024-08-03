import backendAPI from '../../../apis/backend';
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
    payload.append('bufferContents', JSON.stringify(input.bufferContents.value));

    // ここでobjectを作っているのも面倒くさいんだよな。。。
    // えーと。。。何したいんだっけ？？buffer側は
    // const contents = [],
    //   bufferContents = [];
    // input.contents.value.forEach((content) => {
    //   // const fileNameWithoutExtension = `${input.userId}_${new Date().getTime()}`;
    //   if (content.type === 'photo') {
    //     const fileName = `${fileNameWithoutExtension}.jpg`;
    //     const contentObject = {
    //       fileName: fileName,
    //       type: 'photo',
    //       duration: null,
    //     };
    //     contents.push(contentObject);

    //     const bufferContent = {
    //       name: fileName,
    //       uri: content.uri,
    //       type: 'image/jpg',
    //     };
    //     bufferContents.push(bufferContent);
    //   } else if (content.type === 'video') {
    //     const fileName = `${fileNameWithoutExtension}.mp4`;
    //     const contentObject = {
    //       fileName: fileName,
    //       type: 'video',
    //       duration: content.duration,
    //     };

    //     contents.push(contentObject);
    //     // このbuffer contentsは、あくまでmulterで処理するためのobject
    //     // 実際にhandler側で使うのはcontentsを使う。
    //     // この形じゃないとmulterで処理できないかも。
    //     const bufferContent = {
    //       name: fileName,
    //       uri: content.uri,
    //       type: 'video/mp4',
    //     };
    //     bufferContents.push(bufferContent);
    //   }
    // });

    // if (createNewPostFormData.addedLocationTag) {
    //   if (createNewPostFormData.addedLocationTag.created) {
    //     payload.append('createdLocationTag', JSON.stringify(createNewPostFormData.addedLocationTag)); // これがない場合もある。
    //   } else {
    //     payload.append('addedLocationTag', JSON.stringify(createNewPostFormData.addedLocationTag._id)); // これがない場合もある。
    //   }
    // } else {
    //   payload.append('addedLocationTag', '');
    // }
    //  ----- 一回ここdebuggingでコメントアウト
    // for (let content of input.contents.value) {
    //   const fileName = `${content.uri.split('/').pop().split('.')[0]}.${content.type === 'photo' ? 'png' : 'mp4'}`;
    //   const obj = {
    //     name: fileName,
    //     uri: content.uri,
    //     type: content.type === 'photo' ? 'image/jpg' : 'video/mp4',
    //   };
    //   payload.append('bufferContents', JSON.parse(JSON.stringify(obj)));
    // }

    // bufferContentsとcontentsってなんでわけているんだけ？
    // かなりわかりづらくないかな。。。

    // setSnackBar({
    //   isVisible: true,
    //   status: 'success',
    //   message: 'It takes couple seconds to finish processing....',
    //   duration: 4000,
    // });
    // const result = await backendAPI.post('/posts', payload, {
    //   headers: { 'Content-type': 'multipart/form-data' },
    // });
    // setCreateNewPostResult((previous) => {
    //   return {
    //     ...previous,
    //     isCreating: false,
    //     isSuccess: true,
    //     responseData: result.data,
    //   };
    // });
    // setCreateNewPostFormData(INITIAL_CREATE_NEW_POST_STATE); // initialのstateに戻す。
    // setSnackBar({
    //   isVisible: true,
    //   status: 'success',
    //   message: 'Post has been created successfully.',
    //   duration: 5000,
    // });
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
    throw error;
  }
};
