import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';

// props.route.params.spaceIdでくるよね。
interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any> | undefined;
}

// ここに、spaceのthumbnailから始まり、
const SpaceDetail: React.FC<RouterProps> = (props) => {
  const [space, setSpace] = useState({});

  const getSpace = async () => {
    const result = await backendAPI.get(`/spaces/${props.route?.params?.spaceId}`);
    const { space } = result.data;
    setSpace(space);
  };
  useEffect(() => {
    getSpace();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text>Space detail</Text>
      <Text style={{ color: 'white' }}>{space.name}</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Members')}>
        <Text style={{ color: 'white' }}>Press to route members</Text>
      </TouchableOpacity>
      <View style={{ width: '100%', position: 'absolute', bottom: 0, padding: 10, backgroundColor: 'red' }}>
        <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 8 }}>
          <Text style={{ color: 'white' }}>Join this space</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpaceDetail;
