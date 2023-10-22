import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Feather } from '@expo/vector-icons';

const Header = () => {
  const { currentSpaceAndUserRelationship, spaceMenuBottomSheetRef, currentSpace } = useContext(GlobalContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const onInvitePress = async () => {
    spaceMenuBottomSheetRef?.current.close();
    const result = await Share.share({
      message: `Invite friend to Space.${'\n'}Download link: https://apps.apple.com/us/app/lampost/id1668526833${'\n'}And then enter the secret key to join this space.${'\n'}Secret key: kokokoko`,
    });
  };

  return (
    <View style={{ marginBottom: 5 }}>
      <View style={{ height: 200, width: '100%', marginBottom: 20 }}>
        <FastImage
          source={{ uri: currentSpaceAndUserRelationship.space.icon }}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, position: 'absolute', bottom: 10, left: 10 }}>
          {currentSpaceAndUserRelationship.space.name}
        </Text>
        {/* <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 25,
            height: 25,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        >
          <Feather name='more-horizontal' color='black' size={20} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;
