import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Share,
  Alert,
} from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { VectorIcon } from '../../../Icons';
import { useCreateSpace } from '../hooks';
import { showMessage } from 'react-native-flash-message';
import { LoadingSpinner } from '../../../components';
import { useRecoilState } from 'recoil';
import {
  mySpacesAtom,
  currentSpaceAtom,
  authAtom,
  logsTableAtom,
  currentTagAtom,
  momentLogsAtom,
  currentTagsTableBySpaceIdsAtom,
} from '../../../recoil';
import { createSpace } from '../../../query';
import { useMutation } from '@tanstack/react-query';
import { mutationKeys } from '../../../query/mutationKeys';
import { CreateSpaceInputType } from '../../../query/types';
import { Colors } from '../../../themes/colors';

const menus = ['Space Visibility', 'Content Type', 'Moment', 'Reaction', 'Comment', 'Description'];
export const convertMinutesToHoursAndMinutes = (minutes: number) => {
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
  const [auth] = useRecoilState(authAtom);
  const [mySpaces, setMySpaces] = useRecoilState(mySpacesAtom);
  const [currentSpace, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const [, setLogsTable] = useRecoilState(logsTableAtom);
  const [, setCurrentTag] = useRecoilState(currentTagAtom);
  const [, setMomentLogs] = useRecoilState(momentLogsAtom);
  const [, setCurrentTagsTableBySpaceIds] = useRecoilState(currentTagsTableBySpaceIdsAtom);
  const createNewSpaceNavigation = useNavigation<CreateNewSpaceStackProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { formData, onNameChange, onIconChange, flashMessageRef } = useContext(CreateNewSpaceContext);
  const { mutate: createSpaceMutate, status } = useMutation({
    mutationKey: [mutationKeys.createSpace],
    mutationFn: (input: CreateSpaceInputType) => createSpace(input),
    onMutate: () => {
      homeStackNavigation.navigate('Home');
      showMessage({ type: 'info', message: 'It takes a few seconds to finish processing...', duration: 8000 });
    },
    onSuccess: (data) => {
      setMySpaces((previous) => [...previous, data.space]);
      // no spaces状態で作った後にcurrentSpaceを割り当ててあげる。
      if (!currentSpace) {
        setCurrentSpace(data.space);
      }
      setLogsTable((previous) => {
        return {
          ...previous,
          [data.space._id]: {
            [data.space.tags[0]._id]: 0,
          },
        };
      });
      setMomentLogs((previous) => {
        return {
          ...previous,
          [data.space._id]: 0,
        };
      });
      //　これは作った時点でいいかな。
      setCurrentTagsTableBySpaceIds((previous) => {
        return {
          ...previous,
          [data.space._id]: data.space.tags[0],
        };
      });
      showMessage({ type: 'success', message: 'Created new space successfully' });
      setTimeout(() => {
        Alert.alert(
          `Invite your friends to ${data.space.name}`,
          `Lampole is the group photo/video sharing app.${'\n'}Your friends can join your space using ${
            data.space.name
          }'s invitation code. Would you like to share it?`,
          [
            {
              text: 'Yes',
              onPress: () =>
                Share.share({
                  title: `Invite your friends to ${data.space.name}`,
                  message: `Hey my friends!${'\n'}Access and download the Lampole app down below${'\n'}https://apps.apple.com/us/app/lampole/id6556818188.${'\n'}Then enter invitation key code to join my space👉 ${
                    data.space.secretKey
                  }`,
                  // url: 'https://apps.apple.com/us/app/var-group-photo-video-sharing/id6472717148',
                }),
            },
            {
              text: 'Skip now',
              onPress: () => null,
            },
          ]
        );
      }, 1500);
    },
  });

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
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  const onCreateSpace = () => {
    const input = { ...formData, user: { _id: auth._id, name: auth.name, avatar: auth.avatar } };
    createSpaceMutate(input);
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
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Ready to start but...
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', marginBottom: 20 }}>
          If you want to customize your space rules,{'\n'}tap any section to change based on your preference.
        </Text>
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
          <ExpoImage
            style={{ width: 110, height: 110, borderRadius: 110 / 2, alignSelf: 'center' }}
            source={{ uri: formData.icon.value }}
            contentFit='cover'
          />
        </TouchableOpacity>
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
        <View style={{ marginBottom: 20, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('SelectSpaceVisibility')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['red1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.MI name='public' size={20} color={Colors.iconColors['red1']} />
              </View>
            }
            title='Visibility'
            value={formData.isPublic.value !== undefined ? (formData.isPublic.value ? 'Public' : 'Private') : ''}
            requirementText={formData.isPublic.value === undefined ? 'Required to choose.' : undefined}
          />
          <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('Description')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['pink1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.MCI name='lead-pencil' size={20} color={Colors.iconColors['pink1']} />
              </View>
            }
            title='Description'
            value={formData.description.value.replace(/\n/g, '')}
            requirementText={!formData.description.value ? 'Required to fill out.' : undefined}
          />
        </View>
        <View style={{ marginBottom: 20, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('ContentType')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['blue1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ExpoImage
                  source={require('../../../assets/forApp/photo-video.png')}
                  style={{ width: 20, height: 20 }}
                  tintColor={Colors.iconColors['blue1']}
                />
              </View>
            }
            title='Content'
            value={
              formData.contentType.value
                ? formData.contentType.value === 'photo'
                  ? 'Photo'
                  : formData.contentType.value === 'video'
                  ? 'Video'
                  : 'Photo & Video'
                : ''
            }
            requirementText={!formData.contentType.value ? 'Required to choose.' : undefined}
          />
          <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('Moment')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['green1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ExpoImage
                  source={require('../../../assets/forApp/ghost.png')}
                  style={{ width: 20, height: 20 }}
                  tintColor={Colors.iconColors['green1']}
                />
              </View>
            }
            title='Moment'
            value={convertMinutesToHoursAndMinutes(formData.disappearAfter.value)}
          />
          <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('Slot')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['orange1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.MCI name='clock-time-two-outline' size={20} color={Colors.iconColors['orange1']} />
              </View>
            }
            title='Slot'
            value={'Anytime'}
            requirementText={!formData.contentType.value ? 'Required to choose.' : undefined}
          />
        </View>
        <View style={{ marginBottom: 15, backgroundColor: 'rgb(30,30,30)', borderRadius: 10 }}>
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('Reaction')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['yellow1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.II name='thumbs-up-sharp' size={20} color={Colors.iconColors['yellow1']} />
              </View>
            }
            title='Reaction'
            value={formData.isReactionAvailable.value ? 'Allowed' : 'Disallowed'}
            requirementText={
              formData.isReactionAvailable.value && !formData.reactions.value.length
                ? 'Please set at least one option.'
                : undefined
            }
          />
          <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
          <MenuCell
            onCellPress={() => createNewSpaceNavigation.navigate('Comment')}
            icon={
              <View
                style={{
                  backgroundColor: Colors.backgroundColors['lightBlue1'],
                  width: 32,
                  height: 32,
                  marginRight: 15,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <VectorIcon.FD name='comments' size={20} color={Colors.iconColors['lightBlue1']} />
              </View>
            }
            title='Comment'
            value={formData.isCommentAvailable.value ? 'Allowed' : 'Disallowed'}
          />
          <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
          {formData.isPublic.value === undefined ? null : formData.isPublic.value ? (
            <MenuCell
              onCellPress={() => createNewSpaceNavigation.navigate('Following')}
              icon={
                <View
                  style={{
                    backgroundColor: Colors.backgroundColors['violet1'],
                    width: 32,
                    height: 32,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.II name='person-add' size={20} color={Colors.iconColors['violet1']} />
                </View>
              }
              title='Following'
              value={formData.isFollowAvailable.value ? 'Allowed' : 'Disallowed'}
              requirementText={
                formData.isFollowAvailable.value && !formData.reactions.value.length
                  ? 'Please set at least one option.'
                  : undefined
              }
            />
          ) : null}
          <View style={{ height: 0.5, backgroundColor: 'rgb(100, 100, 100)', marginLeft: 15 + 32 + 15 }} />
          {formData.isPublic.value === undefined ? null : formData.isPublic.value ? (
            <MenuCell
              onCellPress={() => createNewSpaceNavigation.navigate('Following')}
              icon={
                <View
                  style={{
                    backgroundColor: Colors.backgroundColors['brown1'],
                    width: 32,
                    height: 32,
                    marginRight: 15,
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <VectorIcon.MCI name='account-group' size={20} color={Colors.iconColors['brown1']} />
                </View>
              }
              title='Quota'
              value={formData.isFollowAvailable.value ? 'Free' : 'Disallowed'}
              requirementText={
                formData.isFollowAvailable.value && !formData.reactions.value.length
                  ? 'Please set at least one option.'
                  : undefined
              }
            />
          ) : null}
        </View>
      </ScrollView>
      {/* ここもすぐにmodalを閉じてあげようかな。。。 */}
      <LoadingSpinner isVisible={status === 'pending'} message='Creating a space...' />
      {/* <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', fontSize: 11 }}>
        Note: You can update these settings after creating a space.
      </Text> こういう注意書きは親切ではあるが、デザインをごっちゃにさせる。。。なるべく表面は簡潔にしたいよね。 */}
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
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={onCellPress}
      activeOpacity={0.8}
    >
      {icon}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'white', fontSize: 17 }}>{title}</Text>
            {requirementText !== undefined ? (
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 12, marginTop: 4 }}>{requirementText}</Text>
            ) : null}
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
      </View>
    </TouchableOpacity>
  );
};
