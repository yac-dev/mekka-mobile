import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { ApiResultType, CommentType } from '../../../types';
import { GetCommentsByPostIdOutputType } from '../../../api/types';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { ViewPostStackNavigatorProps } from '../navigations/ViewPostStackNavigator';
import { useNavigation } from '@react-navigation/native';

type IComments = {
  getCommentsResult: ApiResultType<GetCommentsByPostIdOutputType>;
  handleCommentInputPress: () => void;
};

export const Comments: React.FC<IComments> = ({ getCommentsResult, handleCommentInputPress }) => {
  const viewPostStackNavigation = useNavigation<ViewPostStackNavigatorProps>();

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
        <View style={{ flexDirection: 'column', marginBottom: 30 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{
                  width: 35,
                  height: 35,
                  marginRight: 20,
                  borderRadius: 5,
                }}
                source={{ uri: item.createdBy.avatar }}
                contentFit='contain'
              />
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white', marginBottom: 8 }}>{item.createdBy.name}</Text>
                {renderDate(item.createdAt)}
              </View>
            </View>
            {/* ここもnavigationは分けておいて、中身をreusable componentを使い回す様にすればいいよね。 */}
            {/* propsでtitleを受け取ったりって感じでさ。選択肢もそのarrayでもらってくればいいわな。 */}
            <AppButton.Icon
              onButtonPress={() => viewPostStackNavigation.navigate('ReportComment')}
              customStyle={{
                width: 20,
                height: 20,
                backgroundColor: 'rgb(50,50,50)',
                borderRadius: 10,
              }}
              hasShadow={false}
            >
              <VectorIcon.FT name='more-horizontal' size={10} color={'white'} />
            </AppButton.Icon>
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        padding: 15,
      }}
    >
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
