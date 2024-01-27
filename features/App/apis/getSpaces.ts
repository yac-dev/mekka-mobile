import { useState, useEffect, useContext } from 'react';
import backendAPI from '../../../apis/backend';
import { LoadMeOutputType } from '../types';

export const getMySpaces = async () => {
  setSpaceAndUserRelationshipsFetchingStatus('loading');
  const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
  const { spaceAndUserRelationships, updateTable } = result.data;
  setSpaceAndUserRelationships(spaceAndUserRelationships);
  setUpdatesTable(updateTable);
  setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
  setHaveSpaceAndUserRelationshipsBeenFetched(true);
  setSpaceAndUserRelationshipsFetchingStatus('success');
};
