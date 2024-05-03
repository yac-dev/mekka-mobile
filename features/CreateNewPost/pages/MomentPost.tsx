import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Modal, Pressable, StyleSheet } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import backendAPI from '../../../apis/backend';
import { Video } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { AuthContext, SnackBarContext } from '../../../providers';
import { SnackBar } from '../../../components';
import { CurrentSpaceContext } from '../../../providers';
import { ContentType, CreateNewPostContext } from '../contexts';
import { ContentThumbnail } from '../components/ContentThumbnail';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../../../navigations/CreateNewPostStackNavigator';
import { SpaceRootContext } from '../../Space/providers/SpaceRootProvider';
import { CreateMomentInputType } from '../types';

const MomentPost = () => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const { currentSpace } = useContext(CurrentSpaceContext);
  const { onPostTypeChange, pickUpContents, formData, onRemoveContentPress } = useContext(CreateNewPostContext);
  const { auth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { isIpad } = useContext(GlobalContext);
  const { requestCreateMoment } = useContext(SpaceRootContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  // このpageに来た時点で、postTypeをmomentにする。
  useEffect(() => {
    onPostTypeChange('moment');
  }, []);

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onPostPress()} disabled={formData.contents.isValidated ? false : true}>
          <Text
            style={{
              color: formData.contents.isValidated ? 'white' : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.contents]);

  const onPostPress = () => {
    const input: CreateMomentInputType = {
      ...formData,
      userId: auth._id,
      spaceId: currentSpace._id,
      reactions: currentSpace.reactions,
      disappearAfter: currentSpace.disappearAfter.toString(),
    };
    requestCreateMoment(input);
    createNewPostStackNavigation.goBack();
  };

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  }

  const renderContents = () => {
    const list = formData.contents.value.map((content: ContentType, index) => {
      return <ContentThumbnail key={index} content={content} index={index} onRemovePress={onRemoveContentPress} />;
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {formData.contents.value.length ? list : null}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 10 }}>
          <ExpoImage
            source={require('../../../assets/forApp/ghost.png')}
            style={{ width: 20, height: 20, marginRight: 10 }}
            tintColor='white'
          />
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
            }}
          >
            New Moments?
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Your moment post will disappeare within
          </Text>
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
            {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
          </Text>
        </View>
      </View>
      {formData.contents.value.length >= 6 ? null : (
        <TouchableOpacity
          style={{
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
          }}
          onPress={() => pickUpContents()}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='add-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      )}
      {renderContents()}
      <Text
        onPress={() => setModalVisible(true)}
        style={{ color: 'white', position: 'absolute', bottom: 10, alignSelf: 'center' }}
      >
        What is Moment by the way?
      </Text>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              Similar to IG's Stories
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modalText}>
                The main difference is the duration.{'\n'}Instead of 24 hours limitation, the disappearing time depends
                on Space setting. In {currentSpace.name}, it is set to{' '}
                {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
              </Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: 500,
    height: 300,
  },
  modalView: {
    width: 500,
    height: 300,
    backgroundColor: 'rgb(50,50,50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
  },
});

export default MomentPost;
