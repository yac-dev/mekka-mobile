import React, { useEffect, useContext, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GridView, RegionView } from '.';
import { SpaceType, TagType } from '../../../types';
import { viewPostsTypeAtomFamily } from '../atoms';
import { useRecoilValue, useRecoilState } from 'recoil';
import PagerView from 'react-native-pager-view';
import { tagScreenOpenedAtomFamily } from '../atoms';
import { currentTagAtom } from '../../../recoil';

type IPosts = {
  space: SpaceType;
};

export const Posts: React.FC<IPosts> = ({ space }) => {
  const [currentTag] = useRecoilState(currentTagAtom);
  const viewPostsType = useRecoilValue(viewPostsTypeAtomFamily(space._id));
  const [tagScreenOpened, setTagScreenOpened] = useRecoilState(tagScreenOpenedAtomFamily(currentTag._id));

  const pagerViewRef = useRef<PagerView>(null);

  const [currentPostIndex, setCurrentPostIndex] = useState<number>(0);

  const onCurrentPostIndexChange = (index: number) => {
    setCurrentPostIndex(index);
  };

  useEffect(() => {
    pagerViewRef.current?.setPage(viewPostsType === 'grid' ? 0 : 1);
  }, [viewPostsType]);

  useEffect(() => {
    setTagScreenOpened(true);
  }, []);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={viewPostsType === 'grid' ? 0 : 1}
        scrollEnabled={false}
        ref={pagerViewRef}
      >
        <GridView space={space} tag={currentTag} />
        <RegionView tag={currentTag} />
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pagerView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
