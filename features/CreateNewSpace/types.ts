import { SpaceType } from '../../types';

export type CreateSpaceInputType = {
  // ここがformDataになるんだが。。。どうするか。
  name: string;
  contentType: string;
  isPublic: string; // Assuming isPublic is a string, change to boolean if appropriate
  isCommentAvailable: string; // Assuming isCommentAvailable is a string, change to boolean if appropriate
  isReactionAvailable: string; // Assuming isReactionAvailable is a string, change to boolean if appropriate
  reactions: string;
  videoLength: string; // Assuming videoLength is a string, change to number if appropriate
  disappearAfter: string; // Assuming disappearAfter is a string, change to number if appropriate
  description: string;
  createdBy: string;
  icon: string;
};

export type CreateSpaceOutputType = {
  space: SpaceType;
};

// const payload = new FormData();
//     payload.append('name', formData.name.value);
//     payload.append('contentType', formData.contentType.value);
//     payload.append('isPublic', formData.isPublic.toString()); // ここ、booleanのdata送るのも大変だよな。。。
//     payload.append('isCommentAvailable', formData.isCommentAvailable.toString());
//     payload.append('isReactionAvailable', formData.isReactionAvailable.toString());
//     payload.append('reactions', JSON.stringify(formData.reactions));
//     payload.append('videoLength', formData.videoLength.toString());
//     payload.append('disappearAfter', formData.disappearAfter.toString());
//     payload.append('description', formData.description.value);
//     payload.append('createdBy', JSON.stringify(userData));
//     const fileName = `${formData.icon.value.split('/').pop().split('.')[0]}.png`;
//     const iconData = {
//       name: fileName,
//       uri: formData.icon,
//       type: 'image/jpeg',
//     };

//     payload.append('icon', JSON.parse(JSON.stringify(iconData)));
