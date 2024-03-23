import { useState, useEffect, useContext } from 'react';
import backendAPI from '../../../apis/backend';
import { GetMySpacesInput, GetMySpacesOutput } from '../types';

// ここら辺のuser id系は、input使って入れることにする。useで。
export const getMySpaces = async (input: GetMySpacesInput): Promise<GetMySpacesOutput> => {
  try {
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${input.userId}`);
    console.log('get my spaces!!', result.data);
    const { mySpaces, updateTable } = result.data;
    console.log('update table', updateTable);
    return {
      mySpaces,
      updateTable,
    };
  } catch (error) {
    throw error;
  }
  // setSpaceAndUserRelationships(spaceAndUserRelationships);
  // setUpdatesTable(updateTable);
  // setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
  // setHaveSpaceAndUserRelationshipsBeenFetched(true);
  // setSpaceAndUserRelationshipsFetchingStatus('success');
};
