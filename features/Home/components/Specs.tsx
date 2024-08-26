import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { Times } from '../../../utils';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

export const Specs = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  return (
    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
      <ScrollView horizontal contentContainerStyle={{ paddingRight: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Spec
            title='Status'
            icon={<VectorIcon.MI name='public' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />}
            value={currentSpace.isPublic ? 'Public' : 'Private'}
            hasNext
          />
          <Spec
            title='Content'
            icon={<VectorIcon.II name='camera' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />}
            value={
              currentSpace.contentType === 'photo'
                ? 'Photos'
                : currentSpace.contentType === 'video'
                ? 'Videos'
                : `Photos/Videos`
            }
            hasNext
          />
          {/* video lengthがおかしいのか。。。 */}
          {currentSpace.videoLength && (
            <Spec
              title='Video length'
              icon={
                <VectorIcon.II name='play-circle' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />
              }
              value={`${currentSpace.videoLength}s`}
              hasNext
            />
          )}

          <Spec
            title='Moments'
            icon={
              <ExpoImage
                style={{ width: 15, height: 15, marginRight: 5 }}
                source={require('../../../assets/forApp/ghost.png')}
                contentFit='contain'
                tintColor={'rgb(150,150,150)'}
              />
            }
            value={Times.minutesToHoursAndMinutes(currentSpace.disappearAfter)}
            hasNext
          />
          <Spec
            title='Reactions'
            icon={<VectorIcon.MCI name='thumb-up' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />}
            value={currentSpace.isReactionAvailable ? `Available (${String(currentSpace.reactions.length)})` : 'N/A'}
            hasNext
          />
          <Spec
            title='Comment'
            icon={
              <VectorIcon.MCI name='comment-multiple' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />
            }
            value={currentSpace.isCommentAvailable ? 'Available' : 'N/A'}
            hasNext
          />

          <Spec
            title='Ads'
            icon={<VectorIcon.FD name='megaphone' color={'rgb(150,150,150)'} size={15} style={{ marginRight: 5 }} />}
            value={'Free'}
            hasNext={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

type SpecProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
  hasNext: boolean;
};

const Spec: React.FC<SpecProps> = ({ title, icon, value, hasNext }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 150,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {icon}
          <Text style={{ color: 'rgb(150,150,150)' }}>{title}</Text>
        </View>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{value}</Text>
      </View>
      {hasNext && (
        <View
          style={{
            height: 25,
            width: 1,
            backgroundColor: 'rgb(150,150,150)',
          }}
        />
      )}
    </View>
  );
};
