import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import backendAPI from '../../../apis/backend';
import { MomentsContext } from '../../Moments/contexts/MomentsContext';
import Content from '../components/Content';

const ViewMoment = (props) => {
  const { currentPost, setCurrentPost, moments, currentIndex } = useContext(MomentsContext);
  const mediaRefs = useRef([]);
  const reactionStatusesBottomSheetRef = useRef(null);
  const commentInputBottomSheetRef = useRef(null);
  const textInputRef = useRef(null);
  const [reactionStatuses, setReactionStatuses] = useState([]);
  const [isLoadingReactionStatuses, setIsLoadingReactionStatuses] = useState(false);

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          // -50はbottom menuのheight文を引いている。
          {
            flex: 1,
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            backgroundColor: 'black',
          },
          // index % 2 === 0 ? { backgroundColor: 'red' } : { backgroundColor: 'blue' },
        ]}
      >
        <Content moment={item} ref={(ContentRef) => (mediaRefs.current[item._id] = ContentRef)} />
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      if (element.isViewable) {
        setCurrentPost(element.item);
      }
    });
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={moments}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item, index) => `${item._id}-${index}`}
        decelerationRate={'normal'}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').height, // Set the height of each item
          offset: Dimensions.get('window').height * index, // Calculate the offset based on the index
          index, // Pass the index
        })}
      />
    </View>
  );
};

export default ViewMoment;
