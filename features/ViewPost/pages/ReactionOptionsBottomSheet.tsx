import React, { useMemo, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

// rgb(35, 35, 35)
const ReactionOptionsBottomSheet = (props) => {
  const snapPoints = useMemo(() => ['60%'], []);
  const { isIpad, setLoading, authData } = useContext(GlobalContext);
  const { reactionStatusesBottomSheetRef, reactionStatuses, setReactionStatuses, isLoadingReactionStatuses } =
    useContext(ViewPostContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const iconContainerWidth = oneGridWidth * 0.9;

  // const upvoteReaction = async (reactionStatus, index) => {
  //   setLoading(true);
  //   const result = await backendAPI.post(
  //     `/userandreactionrelationships/user/${authData._id}/post/${reactionStatus.post}`,
  //     { reactionId: reactionStatus.reaction._id }
  //   );
  //   setLoading(false);
  //   setReactionStatuses((previous) => {
  //     const updating = [...previous];
  //     updating[index].count++;
  //     return updating;
  //   });
  // };

  // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。
  const renderReactionStatuses = () => {
    if (reactionStatuses.length) {
      const list = reactionStatuses.map((reactionStatus, index) => {
        return (
          <View
            key={index}
            style={{
              // backgroundColor: 'red',
              // backgroundColor: 'rgb(70, 70, 70)',
              // borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              // marginRight: 10,
              width: oneGridWidth,
              aspectRatio: 1,
              padding: 10,
              // marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                // backgroundColor: 'rgb(70, 70, 70)',
                width: iconContainerWidth,
                aspectRatio: 1,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              // onPress={() => upvoteReaction(reactionStatus, index)}
            >
              {reactionStatus.reaction.type === 'emoji' ? (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 60,
                      marginBottom: 10,
                      //  marginRight: reactionStatus.count ? 10 : 0
                    }}
                  >
                    {reactionStatus.reaction.emoji}
                  </Text>
                  {reactionStatus.count ? (
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{reactionStatus.count}</Text>
                  ) : (
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: 'rgba(45, 209, 40, 0.85)',
                        borderRadius: 13,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialCommunityIcons name='plus' size={15} color='white' />
                    </View>
                  )}
                </View>
              ) : (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <FastImage
                    source={{ uri: reactionStatus.reaction.sticker.url }}
                    style={{
                      width: 60,
                      height: 60,
                      marginBottom: 10,
                      // marginRight: reactionStatus.count ? 10 : 0
                    }}
                  />
                  {reactionStatus.count ? (
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{reactionStatus.count}</Text>
                  ) : (
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: 'rgba(45, 209, 40, 0.85)',
                        borderRadius: 13,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialCommunityIcons name='plus' size={15} color='white' />
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: 'white',
              marginBottom: 10,
              flexWrap: 'wrap',
            }}
          >
            {list}
          </View>
        </ScrollView>
      );
    } else {
      return <Text style={{ color: 'white' }}>No reactions</Text>;
    }
  };

  return (
    <GorhomBottomSheet
      index={-1}
      enableOverDrag={true}
      ref={reactionStatusesBottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
      handleIndicatorStyle={{ backgroundColor: 'white' }}
      // onClose={() => onSelectedItemBottomSheetClose()}
    >
      <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
        {space.isReactionAvailable ? (
          <>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>How do you feel?</Text>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => reactionStatusesBottomSheetRef.current.close()}
              >
                <Ionicons name='close-circle-sharp' size={30} color='white' />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginRight: 20,
                borderBottomWidth: 0.3,
                borderBottomColor: 'white',
              }}
            >
              <Text style={{ color: 'white' }}>View all reactions</Text>
            </TouchableOpacity>
            {isLoadingReactionStatuses ? <ActivityIndicator /> : renderReactionStatuses()}
          </>
        ) : (
          <View style={{}}>
            <TouchableOpacity
              style={{ marginRight: 10, alignSelf: 'flex-end', marginBottom: 10 }}
              onPress={() => {
                props.reactionStatusesBottomSheetRef.current.close();
              }}
            >
              <Ionicons name='close-circle-sharp' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
              Reaction is not allowed in this space.
            </Text>
          </View>
        )}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
};

export default ReactionOptionsBottomSheet;
