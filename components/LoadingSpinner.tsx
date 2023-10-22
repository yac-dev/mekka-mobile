import React, { useContext, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingSpinner = (props) => {
  const { loading } = useContext(GlobalContext);

  return <Spinner visible={loading} textContent={'Processing now...'} textStyle={{ color: 'white' }} />;
};

export default LoadingSpinner;
