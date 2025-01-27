import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';

type AddNewSpaceMenuProps = {
  onCreateNewSpacePress: () => void;
  onEnterPrivateKeyPress: () => void;
  onDiscoverPress: () => void;
};

const screenHorizontalPadding = 20;

const itemWidth = (Dimensions.get('window').width - screenHorizontalPadding * 2) / 2;

export const AddNewSpaceMenu: React.FC<AddNewSpaceMenuProps> = ({
  onCreateNewSpacePress,
  onEnterPrivateKeyPress,
  onDiscoverPress,
}) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: 'row' }}
        contentContainerStyle={{
          paddingLeft: screenHorizontalPadding,
          paddingRight: 5,
        }}
      >
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onCreateNewSpacePress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MCI name='rocket-launch' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Create New</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Open your own space from here</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onEnterPrivateKeyPress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.II name='key' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>
                Enter Private Key
              </Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Got invitation keys?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ width: itemWidth, paddingRight: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 20,
              width: '100%',
              height: 160,
            }}
            activeOpacity={0.8}
            onPress={onDiscoverPress}
          >
            <View
              style={{
                height: 85,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 0.3,
                borderBottomColor: 'rgb(100,100,100)',
              }}
            >
              <VectorIcon.MCI name='compass' color={Colors.white} size={50} />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>Discover New</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Jump into public space</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
