import React, { useContext, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MomentsContext } from '../contexts/MomentsContext';
import MomentThumbnail from '../components/MomentThumbnail';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';

export const Moments = () => {
  const oneAssetWidth = Dimensions.get('window').width / 3;

  // const loadMoreItem = () => {
  //   if (hasMoreItems) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const renderLoader = () => {
  //   if (hasMoreItems) {
  //     return isLoading ? (
  //       <View>
  //         <ActivityIndicator />
  //       </View>
  //     ) : null;
  //   } else {
  //     return null;
  //   }
  // };

  // const renderItem = useCallback((moment, index) => {
  //   return <MomentThumbnail moment={moment} index={index} navigation={props.navigation} />;
  // }, []);

  // if (moments.length) {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: 'black' }}>
  //       <FlatList
  //         style={{ paddingTop: 10 }}
  //         numColumns={3}
  //         data={moments}
  //         renderItem={({ item, index }) => renderItem(item, index)}
  //         keyExtractor={(item, index) => `${item._id}-${index}`}
  //         onEndReached={loadMoreItem}
  //         ListFooterComponent={renderLoader}
  //         onEndReachedThreshold={0}
  //       />
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: 'black' }}>
  //       <Text style={{ color: 'white', textAlign: 'center', marginTop: 50 }}>There are no moments currentlly...</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Moments</Text>
      <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20, backgroundColor: 'rgb(50,50,50)' }}
        onButtonPress={() => console.log('post moments')}
        isPressDisabled={false} // createのstatusをここに足す感じだな。
        hasShadow
      >
        <VectorIcon.II name='add' size={32} color={'white'} />
        {/* {createNewPostResult.isCreating ? (
          <ActivityIndicator size={'small'} />
          ) : (
          <Ionicons name='add' size={32} color={'black'} />
        )} */}
      </AppButton.Icon>
    </View>
  );
};
