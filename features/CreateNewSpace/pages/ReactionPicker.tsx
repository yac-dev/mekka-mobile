import React, { useState, useContext, memo, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, TextInput } from 'react-native';
import { emojis } from '../../../utils/emojis';
import { ReactionPickerContext, ReactionPickerProvider } from '../contexts/ReactionPickerProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { AntDesign } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Stickers from './Stickers';
import { Image as ExpoImage } from 'expo-image';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateNewSpaceStackParams, CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { SelectedReactions, ReactionCategoryBottomTab, SelectedReaction } from '../components';
import { VectorIcon } from '../../../Icons';

// まずreacttionをどういう形で作っているか、それを見るべきだよね。。。
const Tab = createBottomTabNavigator();

type ReactionPickerProps = NativeStackScreenProps<CreateNewSpaceStackParams, 'ReactionPicker'>;

//  これ、iconも必要か。。。
const emojiTypes = ['People', 'Symbols', 'Nature', 'Food', 'Activity', 'Travel', 'Objects', 'Flags'];

const ReactionPicker: React.FC<ReactionPickerProps> = ({ route }) => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { selectedReactionOption, onCaptionChange } = useContext(ReactionPickerContext);
  // const [selectedReactions, setSelectedReactions] = useState({}); // {emoji: true}
  // ここでemojiOptionsを持っておかないとだめかね。。。
  // ここでcontextとれないわな。。。ミスったわ。。。

  // useEffect(() => {
  //   if (route.params.reactions) {
  //     setSelectedReactions(() => {
  //       const table = {};
  //       route.params.reactions.forEach((reaction) => {
  //         if (reaction.type === 'emoji') {
  //           table[reaction.emoji] = reaction;
  //         } else if (reaction.type === 'sticker') {
  //           table[reaction.sticker._id] = reaction;
  //         }
  //       });
  //       return table;
  //     });
  //   }
  // }, [route.params.reactions]);

  // useEffect(() => {
  //   if(route.params.generatedSticker){
  //     setSelectedReactions((previous) => {
  //       const updating = { ...previous };
  //       updating[]
  //     });
  //   }
  // },[route.params.generatedSticker])

  // const renderSelectedEmojis = () => {
  //   if (Object.values(selectedReactions).length) {
  //     const selectedReactionsList = Object.values(selectedReactions);
  //     if (selectedReactionsList.length) {
  //       const list = selectedReactionsList.map((reactionObject, index) => {
  //         return (
  //           <View
  //             key={index}
  //             style={{
  //               width: 50,
  //               height: 50,
  //               backgroundColor: 'rgb(80, 80, 80)',
  //               borderRadius: 15,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //               marginRight: 8,
  //             }}
  //           >
  //             {reactionObject.type === 'emoji' ? (
  //               <Text style={{ fontSize: 40 }}>{reactionObject.emoji}</Text>
  //             ) : (
  //               <ExpoImage
  //                 style={{ width: 40, height: 40 }}
  //                 source={{ uri: reactionObject.sticker.url }}
  //                 contentFit='cover'
  //               />
  //             )}
  //             <TouchableOpacity
  //               style={{
  //                 backgroundColor: 'red',
  //                 borderRadius: 10,
  //                 width: 20,
  //                 height: 20,
  //                 justifyContent: 'center',
  //                 alignItems: 'center',
  //                 position: 'absolute',
  //                 top: -7,
  //                 right: -7,
  //               }}
  //               onPress={() => {
  //                 console.log(selectedReactions);
  //                 console.log(reactionObject);
  //                 setSelectedReactions((previous) => {
  //                   const updating = { ...previous };
  //                   if (reactionObject.type === 'emoji') {
  //                     delete updating[reactionObject.emoji];
  //                   } else if (reactionObject.type === 'sticker') {
  //                     delete updating[reactionObject.sticker._id];
  //                   }
  //                   return updating;
  //                 });
  //               }}
  //             >
  //               <MaterialCommunityIcons name='minus' color={'white'} size={20} />
  //             </TouchableOpacity>
  //           </View>
  //         );
  //       });

  //       return (
  //         <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20 }}>
  //           {list}
  //         </View>
  //       );
  //     } else {
  //       return null;
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  // console.log(selectedReactions);

  // const renderSelectedReaction = useCallback(({ item }) => {
  //   return (
  //     <View
  //       style={{
  //         width: 50,
  //         height: 50,
  //         backgroundColor: 'rgb(80, 80, 80)',
  //         borderRadius: 15,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         marginRight: 8,
  //         marginBottom: 8,
  //       }}
  //     >
  //       {item.type === 'emoji' ? (
  //         <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
  //       ) : (
  //         <ExpoImage style={{ width: 40, height: 40 }} source={{ uri: item.sticker.url }} contentFit='cover' />
  //       )}
  //       <View
  //         style={{
  //           width: 28,
  //           height: 28,
  //           backgroundColor: 'black',
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           position: 'absolute',
  //           top: -13,
  //           right: -13,
  //           borderRadius: 14,
  //         }}
  //       >
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: 'white',
  //             borderRadius: 10,
  //             width: 20,
  //             height: 20,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}
  //           onPress={() => {
  //             setSelectedReactions((previous) => {
  //               const updating = { ...previous };
  //               if (item.type === 'emoji') {
  //                 delete updating[item.emoji];
  //               } else if (item.type === 'sticker') {
  //                 delete updating[item.sticker._id];
  //               }
  //               return updating;
  //             });
  //           }}
  //         >
  //           <Ionicons name='close' color={'black'} size={15} />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }, []);

  // const renderSelectedReactions = () => {
  //   if (Object.values(selectedReactions).length) {
  //     return (
  //       <View>
  //         <FlatList
  //           data={Object.values(selectedReactions)}
  //           renderItem={renderSelectedReaction}
  //           keyExtractor={(item, index) => `${item.id}-${index}`}
  //           contentContainerStyle={{ alignSelf: 'center', padding: 20 }}
  //           numColumns={6}
  //         />
  //       </View>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // ここ、scrollの挙動遊ぶの面白そう。。。

  console.log('selected', selectedReactionOption);

  return (
    <ReactionPickerProvider>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        {/* <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 10 }}>
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
        </View> */}
        <SelectedReaction />
        {/* <SelectedReactions reactions={route.params.reactions} /> */}
        <ReactionCategoryBottomTab />
      </View>
    </ReactionPickerProvider>
  );
};

export default ReactionPicker;
