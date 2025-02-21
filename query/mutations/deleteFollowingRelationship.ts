import { axiosClient } from '../axiosClient';
import { CreateFollowingRelationshipInputType, DeleteFollowingRelationshipInputType } from '../types';

export const deleteFollowingRelationship = async (input: DeleteFollowingRelationshipInputType) => {
  try {
    // これinputの方法、dataっていうkeyで覆わないといかんのか？？
    const result = await axiosClient.delete(`/followingrelationships`, {
      data: {
        followerId: input.followerId,
        followeeId: input.followeeId,
        spaceId: input.spaceId,
      },
    });
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred joining the public space...');
    }
  }
};
