import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import FastImage from 'react-native-fast-image';

const Description = () => {
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

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
      {/* <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ color: 'white' }}>4 members</Text>
          <TouchableOpacity
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 10,
              paddingBottom: 10,
              backgroundColor: 'white',
              borderRadius: 20,
              marginRight: 15,
            }}
            onPress={() => onInvitePress()}
          >
            <Text style={{ fontWeight: 'bold' }}>Invite</Text>
          </TouchableOpacity>
        </View> */}
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 10, color: 'white' }}>Description</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage
            source={{ uri: currentSpace.createdBy.avatar }}
            style={{ width: 30, height: 30, borderRadius: 20, marginRight: 10 }}
          />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{currentSpace.createdBy.name}</Text>
        </View>
        {renderDate(currentSpace.createdAt)}
      </View>
      <Text onTextLayout={onTextLayout} numberOfLines={textShown ? undefined : 3} style={{ color: 'white' }}>
        {currentSpace.description}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} style={{ marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}>
          {textShown ? 'Read less' : 'Read more'}
        </Text>
      ) : null}
    </View>
  );
};

export default Description;
