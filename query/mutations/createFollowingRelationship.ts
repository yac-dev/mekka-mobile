import { axiosClient } from '../axiosClient';
import { CreateFollowingRelationshipInputType, CreateFollowingRelationshipOutputType } from '../types';

export const createFollowingRelationship = async (
  input: CreateFollowingRelationshipInputType
): Promise<CreateFollowingRelationshipOutputType> => {
  try {
    const result = await axiosClient.post(`/followingrelationships`, {
      followerId: input.followerId,
      followeeId: input.followeeId,
      spaceId: input.spaceId,
    });
    const { followingRelationship } = result.data.data;

    return {
      followingRelationship,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred joining the public space...');
    }
  }
};
