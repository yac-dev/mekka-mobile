import React, { useMemo, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import GorhomBottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { ViewPostContext } from '../contexts/ViewPostContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { Image as ExpoImage } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { AuthContext } from '../../../providers';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// rgb(35, 35, 35)
const ReactionOptionsBottomSheet = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const snapPoints = useMemo(() => ['57%'], []);
  const { isIpad, setLoading } = useContext(GlobalContext);
  const {
    reactionStatusesBottomSheetRef,
    reactionStatuses,
    setReactionStatuses,
    isLoadingReactionStatuses,
    isReactionsBottomSheetOpen,
    setIsReactionsBottomSheetOpen,
    getReactionStatuses,
  } = useContext(ViewPostContext);
  const {
    spaceAndUserRelationship: { space },
  } = useContext(SpaceRootContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const iconContainerWidth = oneGridWidth * 0.7;

  const upvoteReaction = async (reactionStatus, index) => {
    setLoading(true);
    const result = await backendAPI.post(`/userandreactionrelationships/user/${auth._id}/post/${reactionStatus.post}`, {
      reactionId: reactionStatus.reaction._id,
    });
    setLoading(false);
    setReactionStatuses((previous) => {
      const updating = [...previous];
      updating[index].count++;
      return updating;
    });
  };

  // const openReactionStatusBottomSheet = () => {
  //   reactionStatusesBottomSheetRef.current.snapToIndex(0);
  //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  //   getReactionStatuses();
  // };

  // console.log('bottom sheet state', isReactionsBottomSheetOpen);
  useEffect(() => {
    if (isReactionsBottomSheetOpen) {
      // reactionStatusesBottomSheetRef.current.snapToIndex(0);
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      getReactionStatuses();
    }
  }, [isReactionsBottomSheetOpen]);

  // とりあえず、1以上のものだけ、0のものをextractする感じでいいか。
  const renderReactionStatuses = () => {
    if (reactionStatuses.length) {
      const list = reactionStatuses.map((reactionStatus, index) => {
        return (
          <View
            key={index}
            style={{
              // backgroundColor: 'blue',
              // backgroundColor: 'rgb(70, 70, 70)',
              // borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              // marginRight: 10,
              width: oneGridWidth,
              aspectRatio: 1,
              padding: 5,
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
                // backgroundColor: 'red',
              }}
              onPress={() => upvoteReaction(reactionStatus, index)}
            >
              {reactionStatus.reaction.type === 'emoji' ? (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View
                    style={{
                      width: iconContainerWidth * 0.6,
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 60,
                      }}
                    >
                      {reactionStatus.reaction.emoji}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <View
                    style={{
                      width: iconContainerWidth * 0.6,
                      aspectRatio: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}
                  >
                    <ExpoImage
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={{ uri: reactionStatus.reaction.sticker.url }}
                      contentFit='contain'
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            {reactionStatus.reaction.caption.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgb(70,70,70)',
                  padding: 5,
                  borderRadius: 10,
                  maxWidth: oneGridWidth,
                }}
              >
                <View
                  style={{
                    marginRight: 5,
                    borderRightWidth: 1,
                    borderColor: 'rgb(150,150,150)',
                    paddingLeft: 3,
                    paddingRight: 3,
                    flex: 9,
                  }}
                >
                  <Text numberOfLines={1} style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
                    {reactionStatus.reaction.caption}
                  </Text>
                </View>
                <View style={{ paddingLeft: 3, paddingRight: 3, flex: 1 }}>
                  <Text style={{ color: 'white' }}>{reactionStatus.count}</Text>
                </View>
              </View>
            ) : (
              <View style={{ backgroundColor: 'rgb(70,70,70)', padding: 5, borderRadius: 10 }}>
                <Text style={{ color: 'white' }}>{reactionStatus.count}</Text>
              </View>
            )}
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

  // if (!isReactionsBottomSheetOpen) {
  //   return null;
  // }

  if (isReactionsBottomSheetOpen) {
    return (
      <GorhomBottomSheet
        index={0}
        enableOverDrag={true}
        ref={reactionStatusesBottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        enablePanDownToClose={true}
        backgroundStyle={{ backgroundColor: 'rgb(40, 40, 40)' }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
        onClose={() => setIsReactionsBottomSheetOpen(false)}
      >
        <BottomSheetView style={{ flex: 1, paddingTop: 10 }}>
          {space.isReactionAvailable ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10 }}>
                  How do you feel?
                </Text>
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    reactionStatusesBottomSheetRef.current.close();
                  }}
                >
                  <Ionicons name='close-circle-sharp' size={30} color='white' />
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  borderBottomWidth: 0.3,
                  borderBottomColor: 'white',
                }}
              >
                <Text style={{ color: 'white' }}>View all reactions</Text>
              </TouchableOpacity> */}
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
  } else {
    return null;
  }
};

export default ReactionOptionsBottomSheet;
