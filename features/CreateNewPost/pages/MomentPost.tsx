import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import SnackBar from '../../../components/SnackBar';

const MomentPost = (props) => {
  const { isIpad, setLoading, setSnackBar, authData } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const [contents, setContets] = useState([]);
  // const { space } = props.route.params;
  const { space, setMoments, moments } = useContext(CreateNewPostContext);

  const calcurateMinutes = () => {
    if (space.disappearAfter >= 60) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {space.disappearAfter / 60} hours.
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
          {space.disappearAfter} minutes.
        </Text>
      );
    }
  };
  // spaceのvideo lengthも含めてな。ここでやろうか。

  const pickContents = async () => {
    const pickerOption = {
      mediaTypes:
        space.contentType === 'photo'
          ? ImagePicker.MediaTypeOptions.Images
          : space.contentType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      duration: space.videoLength ? 3000 : null,
    };

    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    // if (!result.canceled && result.assets) {
    //   // result assets それぞれのassetに対して、dataを作る様にすると。
    //   setMoments((previous) => {
    //     const addedAssets = result.assets.map((asset) => {
    //       return {
    //         uri: asset.uri,
    //         type: asset.type === 'image' ? 'image' : 'video',
    //         duration: asset.duration ? asset.duration : null,
    //       };
    //     });

    //     return [...previous, ...addedAssets];
    //   });
    // }
    if (!result.canceled && result.assets) {
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setMoments((previous) => {
        console.log(result.assets);
        const adding = [];
        result.assets.forEach((asset) => {
          if (asset.type === 'video') {
            // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
            if (asset.duration / 1000 <= space.videoLength) {
              adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
            } else {
              // addingのarrayに入れないで、snacbarを出してあげる。無理ですって。
              setSnackBar({
                isVisible: true,
                barType: 'warning',
                message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
                duration: 5000,
              });
            }
          } else if (asset.type === 'image') {
            adding.push({ uri: asset.uri, type: 'image', duration: asset.duration ? asset.duration : null });
          }
        });

        return [...previous, ...adding];
      });
    }
  };

  const renderContents = () => {
    const list = moments.map((content, index) => {
      return (
        <View key={index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          {content.type === 'image' ? (
            <FastImage
              source={{ uri: content.uri }}
              style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            />
          ) : (
            <Video
              source={{ uri: content.uri }}
              style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            />
          )}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -10,
              right: 0,
              backgroundColor: 'red',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              setMoments((previous) => {
                const updating = [...previous];
                const updated = updating.filter((content, idx) => index !== idx);
                return updated;
              })
            }
          >
            <Ionicons name='trash' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {moments.length >= 6 ? null : (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              width: oneAssetWidth,
              height: oneAssetWidth,
              padding: 2,
              borderRadius: oneAssetWidth / 2,
            }}
            onPress={() => pickContents()}
          >
            <AntDesign name='plus' size={30} color='black' style={{ marginBottom: 10 }} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Add</Text>
          </TouchableOpacity>
        )}
        {moments.length ? list : null}
      </View>
    );
  };

  // const renderAddedContents = () => {
  //   if (contents.length) {
  //     const list = contents.map((content, index) => {
  //       return (
  //         <View key={index}>
  //           <FastImage
  //             source={{ uri: content.uri }}
  //             style={{ width: 90, height: 90, borderRadius: 12, marginRight: 10 }}
  //           />
  //           <TouchableOpacity
  //             style={{
  //               position: 'absolute',
  //               top: 0,
  //               right: 10,
  //               backgroundColor: 'red',
  //               width: 30,
  //               height: 30,
  //               borderRadius: 15,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //             onPress={() =>
  //               setContets((previous) => {
  //                 const updating = [...previous];
  //                 return updating.filter((element, idx) => index !== idx);
  //               })
  //             }
  //           >
  //             <Ionicons name='trash' size={20} color={'white'} />
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     });

  //     return (
  //       <ScrollView horizontal={true}>
  //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>{list}</View>
  //       </ScrollView>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create New Moment
        </Text>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Moment is a story of IG. Instead of 24 hours constrain, your moment post will be disappeared within
          </Text>
          {calcurateMinutes()}
        </View>
      </View>
      {renderContents()}
      {/* <View style={{ paddingTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <TouchableOpacity
            style={{
              width: 90,
              aspectRatio: 1,
              backgroundColor: 'rgb(170,170,170)',
              borderRadius: 13,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}
            onPress={() => pickImages()}
          >
            <MaterialCommunityIcons name='plus' size={30} color='white' />
            <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
          </TouchableOpacity>
          {renderAddedContents()}
        </View>
      </View> */}
      <SnackBar />
      <LoadingSpinner />
    </View>
  );
};

export default MomentPost;
