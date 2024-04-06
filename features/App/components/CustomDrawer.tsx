import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AppButton } from '../../../components/Button';
import { VectorIcon } from '../../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { AuthContext, CurrentSpaceContext, SpaceUpdatesContext } from '../../../providers';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

// このnavigationって、Homeのnavigationを受け継ぎ同時にSpacesDrawerのscreenに対するdrawerのnavigationも持っているのか。。。
// まあここはよくわからん。。。
export const CustomDrawer = ({ state, descriptors, navigation }) => {
  const { auth } = useContext(AuthContext);
  const { currentSpace, setCurrentSpace } = useContext(CurrentSpaceContext);
  const { spaceUpdates } = useContext(SpaceUpdatesContext);

  // const updateLastCheckedIn = async () => {
  //   const result = await backendAPI.patch(`/users/${auth._id}/lastcheckedin`, {
  //     spaceId: currentSpaceAndUserRelationship.space._id,
  //   });
  // };

  // const calcurateSumUpdates = () => {
  //   let sum: number = 0;
  //   for (let key in spaceUpdates) {
  //     const values: number[] = Object.values(spaceUpdates[key]).map((v) => Number(v));
  //     const objectKeySum: number = values.reduce((a: number, b: number) => a + b, 0);
  //     sum += objectKeySum;
  //     // 元のコード　↑でどうだろね。わからん。
  //     // const objectKeySum: number = Object.values(spaceUpdates[key]).reduce((a: number, b: number) => a + b, 0);
  //     // sum += objectKeySum;
  //   }
  //   return sum;
  // };

  const onCloseDrawerPress = () => {
    navigation.closeDrawer();
  };

  const onAuthCaretDownPress = () => {
    navigation.closeDrawer();
    // openAuthMenuBottomSheetToIndex(0);
  };

  return (
    <View style={{ paddingTop: 30 }}>
      <AppButton.Icon
        onPressButton={onCloseDrawerPress}
        style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 10 }}
      >
        <VectorIcon.II name='close-circle' size={30} color='white' />
      </AppButton.Icon>
      <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
        <ExpoImage
          style={{ width: 35, height: 35, marginBottom: 10 }}
          source={{ uri: auth.avatar }}
          contentFit='cover'
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold', marginRight: 10 }}>{auth.name}</Text>
          <TouchableOpacity
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
            onPress={onAuthCaretDownPress}
          >
            <VectorIcon.MCI name='chevron-down' size={20} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(150,150,150)',
          padding: 10,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
          }}
          onPress={() => {
            navigation.navigate('CreateNewSpaceStackNavigator');
            navigation.closeDrawer();
          }}
        >
          <View
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 25,
              marginBottom: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VectorIcon.MCI name='plus' color={'black'} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
          }}
          onPress={() => {
            navigation.navigate('Discover');
            navigation.closeDrawer();
          }}
        >
          <View
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 25,
              marginBottom: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VectorIcon.MCI name='compass-outline' color={'black'} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Discover</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
          }}
          onPress={() => {
            navigation.navigate('SecretKeyForm');
            navigation.closeDrawer();
          }}
        >
          <View
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 25,
              marginBottom: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <VectorIcon.II name='key' color={'black'} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Private key</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {state.routes.map((route, index: number) => {
          const spaceUpdatesArray =
            spaceUpdates[route.params?.space._id] && Object.values(spaceUpdates[route.params?.space._id]);
          const sum =
            spaceUpdatesArray && spaceUpdatesArray.reduce((partialSum: number, a: number) => partialSum + a, 0);
          // const { options } = descriptors[route.key];
          // const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            // ここでspaceのdate updateか。
            // updateLastCheckedIn(); //一時停止。
            setCurrentSpace(route.params?.spaceAndUserRelationship);

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={{
                padding: 5,
                // backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
              }}
              onPress={onPress}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: isFocused ? 'rgb(60,60,60)' : 'transparent',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ExpoImage
                    style={{ width: 40, aspectRatio: 1, borderRadius: 10, marginRight: 15 }}
                    source={{ uri: route.params?.space.icon }}
                    contentFit='cover'
                  />
                  <View>
                    <Text numberOfLines={1} style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>
                      {route.params?.space.name}
                    </Text>
                    <Text style={{ color: 'rgb(150,150,150))', fontSize: 13 }}>
                      {route.params?.space.isPublic ? 'Public' : 'Private'}
                    </Text>
                  </View>
                </View>
                {sum ? (
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white' }}>{sum}</Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* <DrawerItemList {...props} /> screenのtabもrenderするようになる。 */}
    </View>
  );
};