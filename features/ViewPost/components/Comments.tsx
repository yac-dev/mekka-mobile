import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import backendAPI from '../../../apis/backend';
import { iconColorTable } from '../../../themes/color';
import { Feather } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { ApiResultType, CommentType } from '../../../types';
import { GetCommentsByPostIdOutputType } from '../../../api/types';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';

type IComments = {
  getCommentsResult: ApiResultType<GetCommentsByPostIdOutputType>;
  handleCommentInputPress: () => void;
};

export const Comments: React.FC<IComments> = ({ getCommentsResult, handleCommentInputPress }) => {
  const renderDate = (date: string) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const renderComment = ({ item }: { item: CommentType }) => {
    if (item.createdBy) {
      return (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 20,
                  backgroundColor: iconColorTable['blue1'],
                  borderRadius: 5,
                }}
                source={{ uri: item.createdBy.avatar }}
                contentFit='contain'
                transition={1000}
                tintColor={'white'}
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white', marginBottom: 8 }}>{item.createdBy.name}</Text>
                {renderDate(item.createdAt)}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Feather name='more-horizontal' size={20} color='white' />
            </TouchableOpacity>
          </View>
          <Text style={{ color: 'white', fontSize: 17 }}>{item.content}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  if (getCommentsResult.status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <FlatList
        data={getCommentsResult.data?.comments}
        renderItem={renderComment}
        keyExtractor={(_, index) => `${index}`}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>No comments yet...</Text>
          </View>
        }
      />
      <AppButton.Icon
        onButtonPress={handleCommentInputPress}
        customStyle={{
          width: 44,
          height: 44,
          backgroundColor: 'rgb(50,50,50)',
          marginRight: 15,
          borderRadius: 22,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
        hasShadow={false}
      >
        <VectorIcon.ETP name='feather' size={20} color={'white'} />
      </AppButton.Icon>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
