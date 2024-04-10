import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { SpaceType } from '../../../types';

type DescriptionProps = {
  space: SpaceType;
};

const Description: React.FC<DescriptionProps> = ({ space }) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', padding: 10 }}>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{ width: 30, height: 30, borderRadius: 20, marginRight: 10 }}
                source={{ uri: space.createdBy.avatar }}
                contentFit='contain'
                transition={1000}
              />
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{space.createdBy.name}</Text>
            </View>
            {renderDate(space.createdAt)}
          </View>
          <Text
            onTextLayout={onTextLayout}
            numberOfLines={textShown ? undefined : 3}
            style={{ color: 'white', lineHeight: 22, padding: 5 }}
          >
            {space.description}
          </Text>
          {lengthMore ? (
            <Text
              onPress={toggleNumberOfLines}
              style={{ marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}
            >
              {textShown ? 'Read less' : 'Read more'}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Description;
