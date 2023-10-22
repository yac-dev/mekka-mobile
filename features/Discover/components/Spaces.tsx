import React, { useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SpacesContext } from '../contexts/DiscoverContext';

const Spaces = () => {
  const { spaces } = useContext(SpacesContext);

  // ここで、flatlistを使う。
  return <View></View>;
};

export default Spaces;
