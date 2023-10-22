import React, { useContext, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MomentsContext } from '../contexts/MomentsContext';
import MomentThumbnail from '../components/MomentThumbnail';

const Moments = (props) => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const { moments, hasMoreItems, setCurrentPage, currentPage, isLoading } = useContext(MomentsContext);

  const loadMoreItem = () => {
    if (hasMoreItems) {
      setCurrentPage(currentPage + 1);
    }
  };
  const renderLoader = () => {
    if (hasMoreItems) {
      return isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : null;
    } else {
      return null;
    }
  };

  const renderItem = useCallback((moment, index) => {
    return <MomentThumbnail moment={moment} index={index} navigation={props.navigation} />;
  }, []);

  if (moments.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <FlatList
          style={{ paddingTop: 10 }}
          numColumns={3}
          data={moments}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          onEndReached={loadMoreItem}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>There are no moments currentlly...</Text>
      </View>
    );
  }
};

export default Moments;
