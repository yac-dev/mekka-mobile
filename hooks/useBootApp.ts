import { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../providers';
import backendAPI from '../apis/backend';

export const useBootApp = () => {
  const { auth, setAuth } = useContext(AuthContext);

  // ここでapiに関するもんをつくっておいたほうがいいよな。。
  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      setAuth(user);
      // setIsAuthDataFetched(true);
      // setIsAuthenticated(true);
    } else {
      // setIsAuthDataFetched(true);
      // setIsAuthenticated(false);
    }
  };

  // const getMySpaces = async () => {
  //   setSpaceAndUserRelationshipsFetchingStatus('loading');
  //   const result = await backendAPI.get(`/spaceanduserrelationships/users/${authData._id}`);
  //   const { spaceAndUserRelationships, updateTable } = result.data;
  //   setSpaceAndUserRelationships(spaceAndUserRelationships);
  //   setUpdatesTable(updateTable);
  //   setCurrentSpaceAndUserRelationship(spaceAndUserRelationships[0]);
  //   setHaveSpaceAndUserRelationshipsBeenFetched(true);
  //   setSpaceAndUserRelationshipsFetchingStatus('success');
  // };

  return {
    loadMe,
  };
};
