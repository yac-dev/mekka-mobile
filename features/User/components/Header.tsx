import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getUserById, queryKeys } from '../../../query';
import { Image as ExpoImage } from 'expo-image';

type IHeader = {
  userId: string;
};

export const Header: React.FC<IHeader> = ({ userId }) => {
  const { data, status } = useQuery({
    queryKey: [queryKeys.userById, userId],
    queryFn: () => getUserById({ userId }),
  });

  if (status === 'pending') {
    return <ActivityIndicator size='large' color='white' />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <ExpoImage source={data.user.avatar} style={styles.avatar} />
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.name}>{data.user.name}</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  followButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  followButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
