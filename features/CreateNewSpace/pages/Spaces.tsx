import React, { useReducer, useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import { primaryBackgroundColor } from '../../../themes/color';
import { primaryTextColor } from '../../../themes/text';
import CreateNewButton from '../components/CreateNewButton';
import { SpacesContext } from '../contexts/SpacesContext';

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

type SpaceType = {
  _id: string;
  name: string;
  contentType: string;
};

// client上では,mekkaとかそういう表現を使うことにする。
const Spaces: React.FC<RouterProps> = (props) => {
  const [spaces, setSpaces] = useState<SpaceType[]>([]);
  const [areSpacesFetched, setAreSpacesFetched] = useState(false);

  const onButtonPress = () => {
    props.navigation.navigate('Create new space');
  };

  const getSpaces = async () => {
    const result = await backendAPI.get('/spaces');
    const { spaces } = result.data;
    setSpaces(spaces);
  };
  useEffect(() => {
    getSpaces();
  }, []);

  // tapして、detailを出す様にする。
  const renderSpace = useCallback((space: any) => {
    return (
      // そうか、ここでrouteでparamsに渡すのは、SpaceDetailStackに渡すんだもんな。
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SpaceDetailStackNavigator', {
            screen: 'SpaceDetail',
            params: { spaceId: space._id },
          })
        }
      >
        <Text style={{ color: 'red', fontSize: 20 }}>{space.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <SpacesContext.Provider value={{ spaces, setSpaces }}>
      <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 10 }}>
        <FlatList
          data={spaces}
          renderItem={({ item }) => renderSpace(item)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
        />
        <CreateNewButton onButtonPress={onButtonPress} />
      </View>
    </SpacesContext.Provider>
  );
};

export default Spaces;
