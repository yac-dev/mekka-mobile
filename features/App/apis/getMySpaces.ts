import { useState, useEffect, useContext } from 'react';
import backendAPI from '../../../apis/backend';
import { GetMySpacesInput, GetMySpacesOutput } from '../types';

// ここら辺のuser id系は、input使って入れることにする。useで。
export const getMySpaces = async (input: GetMySpacesInput) => {
  try {
    const result = await backendAPI.get(`/spaceanduserrelationships/users/${input.userId}`);
    const { spaceAndUserRelationships, updateTable } = result.data;
  } catch (error) {
    throw error;
  }
  // setSpaceAndUserRelationships(spaceAndUserRelationships);
  // setUpdatesTable(updateTable);
  // setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
  // setHaveSpaceAndUserRelationshipsBeenFetched(true);
  // setSpaceAndUserRelationshipsFetchingStatus('success');
};
