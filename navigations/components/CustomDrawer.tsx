import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VectorIcon } from '../../Icons';
import { Image as ExpoImage } from 'expo-image';
import { AuthContext } from '../../providers';
import { LogsTableContext } from '../../providers';

type CustomDrawerProps = DrawerContentComponentProps & {
  onAuthCaretDownPress: () => void;
};

export const CustomDrawer: React.FC<CustomDrawerProps> = ({ state, descriptors, navigation, onAuthCaretDownPress }) => {
  const { auth } = useContext(AuthContext);
  // const {logsTable} = useContext(LogsTableContext);
  const onCloseDrawerPress = () => {
    navigation.closeDrawer();
  };
  return (
    <View style={{ paddingTop: 30 }}>
      <TouchableOpacity
        onPress={onCloseDrawerPress}
        style={{ alignSelf: 'flex-end', marginBottom: 5, marginRight: 10 }}
      >
        <VectorIcon.II name='close-circle' size={30} color='white' />
      </TouchableOpacity>
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
            <MaterialCommunityIcons name='plus' color={'black'} size={25} />
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
            // navigation.closeDrawer();
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
            <MaterialCommunityIcons name='compass-outline' color={'black'} size={25} />
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
              // marginRight: 15,
              marginBottom: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name='key' color={'black'} size={25} />
          </View>
          <Text style={{ color: 'white' }}>Private key</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {state.routes.map((route, index) => {
          const spaceUpdatesArray =
            updatesTable[route.params?.spaceAndUserRelationship.space._id] &&
            Object.values(updatesTable[route.params?.spaceAndUserRelationship.space._id]);
          const sum = spaceUpdatesArray && spaceUpdatesArray.reduce((partialSum, a) => partialSum + a, 0);
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            // ここでspaceのdate updateか。
            updateLastCheckedIn(); //一時停止。
            setCurrentSpaceAndUserRelationship(route.params?.spaceAndUserRelationship);

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
                    source={{ uri: route.params?.spaceAndUserRelationship.space.icon }}
                    contentFit='cover'
                  />
                  <View>
                    <Text numberOfLines={1} style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>
                      {route.params?.spaceAndUserRelationship.space.name}
                    </Text>
                    <Text style={{ color: 'rgb(150,150,150))', fontSize: 13 }}>
                      {route.params?.spaceAndUserRelationship.space.isPublic ? 'Public' : 'Private'}
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
                {/* <Text>{Object.values(updatesTable[route.params?.spaceAndUserRelationship.space])}</Text> */}
                {/* <Text>
                        {Object.values(updatesTable[route.params?.spaceAndUserRelationship.space._id])}
                      </Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {/* ↓これあると、screenのtabもrenderするようになる。 */}
      {/* <DrawerItemList {...props} /> */}
    </View>
  );
};
