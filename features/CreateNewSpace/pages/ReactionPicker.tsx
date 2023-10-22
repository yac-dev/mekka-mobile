import React, { useState, useContext, memo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { emojis } from '../../../utils/emojis';
import { ReactionPickerContext } from '../contexts/ReactionPickerContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { AntDesign } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import EmojisByCategory from '../components/EmojisByCategory';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import SnackBar from '../../../components/SnackBar';
import FastImage from 'react-native-fast-image';
import Stickers from './Stickers';

const Tab = createBottomTabNavigator();

const ReactionPicker = (props) => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const [selectedReactions, setSelectedReactions] = useState({}); // {emoji: true}
  // ここでemojiOptionsを持っておかないとだめかね。。。

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onAddPress()} disabled={Object.keys(selectedReactions).length ? false : true}>
          <Text
            style={{
              color: Object.keys(selectedReactions).length ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedReactions]);

  useEffect(() => {
    if (props.route.params.reactions) {
      setSelectedReactions(() => {
        const table = {};
        props.route.params.reactions.forEach((reactionObject) => {
          if (reactionObject.type === 'emoji') {
            table[reactionObject.emoji] = reactionObject;
          } else if (reactionObject.type === 'sticker') {
            table[reactionObject._id] = reactionObject;
          }
        });
        return table;
      });
    }
  }, [props.route.params.reactions]);

  const onAddPress = () => {
    props.navigation.navigate('Reaction', { selectedReactions: Object.values(selectedReactions) });
  };

  const renderSelectedEmojis = () => {
    if (Object.values(selectedReactions).length) {
      const selectedReactionsList = Object.values(selectedReactions);
      if (selectedReactionsList.length) {
        const list = selectedReactionsList.map((reactionObject, index) => {
          return (
            <View
              key={index}
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'rgb(80, 80, 80)',
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}
            >
              {reactionObject.type === 'emoji' ? (
                <Text style={{ fontSize: 40 }}>{reactionObject.emoji}</Text>
              ) : (
                <FastImage source={{ uri: reactionObject.sticker.url }} style={{ width: 40, height: 40 }} />
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -7,
                  right: -7,
                }}
                onPress={() => {
                  console.log(selectedReactions);
                  console.log(reactionObject);
                  setSelectedReactions((previous) => {
                    const updating = { ...previous };
                    if (reactionObject.type === 'emoji') {
                      delete updating[reactionObject.emoji];
                    } else if (reactionObject.type === 'sticker') {
                      delete updating[reactionObject.sticker._id];
                    }
                    return updating;
                  });
                }}
              >
                <MaterialCommunityIcons name='minus' color={'white'} size={20} />
              </TouchableOpacity>
            </View>
          );
        });

        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20 }}>
            {list}
          </View>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return (
    <ReactionPickerContext.Provider value={{ selectedReactions, setSelectedReactions }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 10 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Add Reactions
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Please choose at most 6 reaction options.
          </Text>
        </View>
        {renderSelectedEmojis()}
        <Tab.Navigator
          initialRouteName='People'
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'rgb(40,40,40)',
              // marginHorizontal: 90,
              // paddingBottom: 0, // きたー。これよ。これ。
              // borderRadius: 30,
              height: 60,
              borderTopWidth: 0,
              paddingTop: 5,
              paddingBottom: 5,
              // position: 'absolute',
              // bottom: 30,
              // justifyContent: 'center',
              // alignItems: 'center',
            },
          }}
        >
          <Tab.Group>
            <Tab.Screen
              name='Stickers'
              component={Stickers}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Ionicons name='star' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            />
            <Tab.Screen
              name='People'
              // component={(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Fontisto name='smiley' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {/* {(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />} */}
              {(props) => <EmojisByCategory category={'people'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Symbols'
              // component={(props) => <Emojis emojiType={'objects'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Ionicons name='heart' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {(props) => <EmojisByCategory category={'symbols'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Nature'
              // component={(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <MaterialCommunityIcons name='dog' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {/* {(props) => <Emojis emojiType={'smileyAndPeople'} {...props} />} */}
              {(props) => <EmojisByCategory category={'nature'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Food'
              // component={(props) => <Emojis emojiType={'symbols'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Ionicons name='pizza' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {(props) => <EmojisByCategory category={'food'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Activity'
              // component={(props) => <Emojis emojiType={'animalsAndNature'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Ionicons name='tennisball' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {(props) => <EmojisByCategory category={'activity'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Travel'
              // component={(props) => <Emojis emojiType={'foodAndDrink'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <MaterialIcons name='flight' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {(props) => <EmojisByCategory category={'travel'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Objects'
              // component={(props) => <Emojis emojiType={'travelAndPlaces'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Foundation name='telephone' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {(props) => <EmojisByCategory category={'objects'} {...props} />}
            </Tab.Screen>
            <Tab.Screen
              name='Flags'
              // component={(props) => <Emojis emojiType={'flags'} {...props} />}
              options={({ navigation, route }) => ({
                tabBarShowLabel: false,
                tabBarIcon: ({ size, color, focused }) => (
                  <Entypo name='globe' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
                ),
              })}
            >
              {(props) => <EmojisByCategory category={'flags'} {...props} />}
            </Tab.Screen>
          </Tab.Group>
          {/* <Tab.Group screenOptions={{modal: 'fullScreen', ges}}>

          </Tab.Group> */}
          {/* <Tab.Screen name='Sticker' component={HomeScreen} /> */}
        </Tab.Navigator>
        <SnackBar />
      </View>
    </ReactionPickerContext.Provider>
  );
};

export default ReactionPicker;
