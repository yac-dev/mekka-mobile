import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalContext } from '../../../contexts/GlobalContext';

const ActionButtons = (props) => {
  const { isIpad, spaceMenuBottomSheetRef, currentSpaceAndUserRelationship, currentSpace } = useContext(GlobalContext);

  const onPostPress = () => {
    spaceMenuBottomSheetRef?.current.close();
    props.navigation?.navigate({
      name: 'CreateNewPost',
      params: { space: currentSpace, spaceAndUserRelationship: currentSpaceAndUserRelationship },
      merge: true,
    });
  };

  const onInvitePress = async () => {
    // const snapshot = await mapRef.current.takeSnapshot({
    //   format: 'png',
    //   quality: 1,
    //   result: 'file',
    // });
    spaceMenuBottomSheetRef?.current.close();
    const result = await Share.share({
      message: `Invite friend to Space.${'\n'}Download link: https://apps.apple.com/us/app/lampost/id1668526833${'\n'}And then enter the secret key to join this space.${'\n'}Secret key: kokokoko`,
    });
  };
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ width: '50%', padding: 5 }}>
        <TouchableOpacity
          style={{ width: '100%', backgroundColor: 'rgb(90,90,90)', padding: 10, borderRadius: 8 }}
          onPress={() => onPostPress()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons name='plus' size={25} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: '50%', padding: 5 }}>
        <TouchableOpacity
          style={{ width: '100%', backgroundColor: 'rgb(90,90,90)', padding: 10, borderRadius: 8 }}
          onPress={() => onInvitePress()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
            <MaterialCommunityIcons name='human-greeting-variant' size={25} color='white' style={{ marginRight: 10 }} />
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Invite</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // <View style={{ backgroundColor: 'rgb(60,60,60)', padding: 10 }}>
    //   <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', marginBottom: 20 }}>
    //     <View>
    //       <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
    //         {currentSpaceAndUserRelationship.space.name}
    //       </Text>
    //       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <View>
    //           <Text style={{ color: 'white' }}>Posts</Text>
    //           <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.totalPosts}</Text>
    //         </View>
    //         <View>
    //           <Text style={{ color: 'white' }}>Members</Text>
    //           <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.totalMembers}</Text>
    //         </View>
    //         <View>
    //           <Text style={{ color: 'white' }}>Rate</Text>
    //           <Text style={{ color: 'white' }}>{currentSpaceAndUserRelationship.space.totalPosts}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  );
};

export default ActionButtons;
