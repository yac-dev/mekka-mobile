import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { VectorIcon } from '../../../Icons';
import { useCreateSpace } from '../hooks';
import { LogsTableContext, CurrentTagContext, CurrentSpaceContext, AuthContext } from '../../../providers';
import { showMessage } from 'react-native-flash-message';
import { LoadingSpinner } from '../../../components';
import { useRecoilState } from 'recoil';
import { mySpacesAtom } from '../../../recoil';

const menus = ['Space Visibility', 'Content Type', 'Moment', 'Reaction', 'Comment', 'Description'];
const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} m`;
  } else if (remainingMinutes === 0) {
    return `${hours} h`;
  } else {
    return `${hours} h ${remainingMinutes} m`;
  }
};

export const Base = () => {
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const createNewSpaceNavigation = useNavigation<CreateNewSpaceStackProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { formData, onNameChange, onIconChange, flashMessageRef } = useContext(CreateNewSpaceContext);
  const { apiResult, requestApi } = useCreateSpace();
  const { setCurrentSpace } = useContext(CurrentSpaceContext);
  const { setCurrentTag } = useContext(CurrentTagContext);
  const { setLogsTable } = useContext(LogsTableContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    createNewSpaceNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onCreateSpace()}
          disabled={
            !formData.name.isValidated ||
            !formData.icon.isValidated ||
            !formData.disappearAfter.isValidated ||
            !formData.isPublic.isValidated ||
            !formData.isReactionAvailable.isValidated ||
            !formData.isCommentAvailable.isValidated ||
            !formData.description.isValidated ||
            !formData.contentType.isValidated ||
            !formData.reactions.isValidated
          }
        >
          <Text
            style={{
              color:
                !formData.name.isValidated ||
                !formData.icon.isValidated ||
                !formData.disappearAfter.isValidated ||
                !formData.isPublic.isValidated ||
                !formData.isReactionAvailable.isValidated ||
                !formData.isCommentAvailable.isValidated ||
                !formData.description.isValidated ||
                !formData.contentType.isValidated ||
                !formData.reactions.isValidated
                  ? 'rgb(100,100,100)'
                  : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  useEffect(() => {
    if (apiResult.status === 'success') {
      setMySpaces((previous) => [...previous, apiResult.data.space]);
      if (!mySpaces?.length) {
        setCurrentSpace(apiResult.data?.space);
        setCurrentTag(apiResult.data?.space.tags[0]);
        setLogsTable((previous) => {
          return {
            ...previous,
            [apiResult.data?.space._id]: {
              [apiResult.data?.space.tags[0]._id]: 0,
            },
          };
        });
      }
      homeStackNavigation.navigate('Home');
      showMessage({ message: 'Created new space successfully.', type: 'success' });
    }
  }, [apiResult.status]);

  const onCreateSpace = () => {
    const input = { ...formData, user: { _id: auth._id, name: auth.name, avatar: auth.avatar } };
    requestApi(input);
  };

  const renderText = () => {
    return (
      <Text style={{ color: formData.name.value.length <= 40 ? 'rgb(170,170,170)' : 'red' }}>
        {formData.name.value.length}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView>
        {/* これviewで囲わないとばぐるんだけど。。。なぜ？？ Viewで囲わないと縦方向にjustifuContent:"space-between"みたいな形になる。。。*/}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgb(50,50,50)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 110,
            height: 110,
            padding: 2,
            borderRadius: 110 / 2,
            marginBottom: 10,
          }}
          onPress={() => onIconChange()}
        >
          {formData.icon.value ? (
            <ExpoImage
              style={{ width: 110, height: 110, borderRadius: 110 / 2, alignSelf: 'center' }}
              source={{ uri: formData.icon.value }}
              contentFit='cover'
            />
          ) : (
            <>
              <VectorIcon.II name='add' size={35} color='white' />
            </>
          )}
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 17, textAlign: 'center', marginBottom: 20 }}>Icon</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'rgb(88, 88, 88)',
          }}
        >
          <TextInput
            style={{
              fontSize: 18,
              color: 'white',
              flex: 1,
              padding: 10,
            }}
            placeholder='Name'
            placeholderTextColor={'rgb(170,170,170)'}
            autoCapitalize='none'
            value={formData.name.value}
            onChangeText={(text) => onNameChange(text)}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderText()}
            <Text style={{ marginRight: 10, color: 'rgb(170,170,170)' }}>/40</Text>
          </View>
        </View>
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('SelectSpaceVisibility')}
          icon={<VectorIcon.MI name='public' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Visibility'
          value={formData.isPublic.value !== undefined ? (formData.isPublic.value ? 'Public' : 'Private') : ''}
          requirementText={formData.isPublic.value === undefined ? 'Required to choose.' : undefined}
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('ContentType')}
          icon={<VectorIcon.MCI name='movie-open' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Content'
          value={
            formData.contentType.value
              ? formData.contentType.value === 'photo'
                ? 'Only Photo'
                : formData.contentType.value === 'video'
                ? 'Only Video'
                : 'Photo & Video'
              : ''
          }
          requirementText={!formData.contentType.value ? 'Required to choose.' : undefined}
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Moment')}
          icon={
            <ExpoImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ marginRight: 10, width: 20, height: 20 }}
              tintColor='white'
            />
          }
          title='Moment'
          value={convertMinutesToHoursAndMinutes(formData.disappearAfter.value)}
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Reaction')}
          icon={<VectorIcon.II name='thumbs-up-sharp' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Reaction'
          value={formData.isReactionAvailable.value ? 'Allowed' : 'Disallowed'}
          requirementText={
            formData.isReactionAvailable.value && !formData.reactions.value.length
              ? 'Please set at least one option.'
              : undefined
          }
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Comment')}
          icon={<VectorIcon.FD name='comments' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Comment'
          value={formData.isCommentAvailable.value ? 'Allowed' : 'Disallowed'}
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Description')}
          icon={<VectorIcon.MCI name='lead-pencil' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Description'
          value={formData.description.value.replace(/\n/g, '')}
          requirementText={!formData.description.value ? 'Required to fill out.' : undefined}
        />
      </ScrollView>
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Creating a space...' />
    </View>
  );
};

type MenuCellProp = {
  onCellPress: () => void;
  icon: React.ReactNode;
  title: string;
  value: string;
  requirementText?: string;
};

const MenuCell: React.FC<MenuCellProp> = ({ onCellPress, icon, title, value, requirementText }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}
      onPress={onCellPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <View>
          <Text style={{ color: 'white', fontSize: 17, marginBottom: requirementText !== undefined ? 0 : 4 }}>
            {title}
          </Text>
          {requirementText !== undefined && (
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>{requirementText}</Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 15, color: 'rgb(170,170,170)', marginRight: 5, width: 100, textAlign: 'right' }}
        >
          {value}
        </Text>
        <VectorIcon.MCI name='chevron-right' size={20} color='rgb(170,170,170)' />
      </View>
    </TouchableOpacity>
  );
};
