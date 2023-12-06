import React, { useCallback, useEffect, useRef, useContext } from 'react';
import { Dimensions, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
const scrollToOffset = Dimensions.get('window').width / 3;

const TagsTabBar = ({ routes, activeTab, onTapTab }) => {
  const { currentTagObject } = useContext(GlobalContext);
  const scrollViewRef = useRef(null);

  // useEffect(() => {
  //   if (kind.scrollable && scrollViewRef.current) {
  //     scrollViewRef.current.scrollToOffset({
  //       offset: (activeTab.id - 1) * scrollToOffset,
  //       animated: true,
  //     });
  //   }
  // }, [activeTab]);

  const renderItem = ({ item: route }) => {
    const isActive = route._id === currentTagObject;
    return (
      <TouchableOpacity
        key={route.key}
        onPress={() => onTapTab?.(route)}
        style={{
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            borderBottomColor: 'white',
            paddingHorizontal: 18,
            borderBottomWidth: isActive ? 3 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: isActive ? 'white' : 'red',
              marginTop: 8,
              marginBottom: 12,
            }}
          >
            {route.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        data={routes}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default TagsTabBar;
