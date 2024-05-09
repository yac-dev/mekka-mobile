import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MomentsStackNavigatorProps } from '../../../navigations';
// シンプルに, momentは写真、動画のpostだけにするわ。もうめんどいし

type PostType = 'post' | 'moment';

type PostEntryProps = {
  type: 'post' | 'moment';
};

export const PostEntry: React.FC<PostEntryProps> = ({ type }) => {
  // propsのtype (postかmomentか)によって、文言とnavigationを変えるんだが、まあいいか。。。
  return <View style={{ flex: 1, backgroundColor: 'black' }}>{type === 'post' ? <View></View> : <View></View>}</View>;
};

const RegularPost = () => {
  return (
    <View>
      <Text style={{ color: 'white' }}>
        Adding caption, tags, location to share your photos/videos with your peers.
      </Text>
      {/* ここで次のpageに移る。 */}
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const Moment = () => {
  return (
    <View>
      <Text style={{ color: 'white' }}>Similart to IG Stories, your post will disappear after 23 hours 59 minutes</Text>
      <TouchableOpacity>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
