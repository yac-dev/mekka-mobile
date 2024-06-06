import { useRef, MutableRefObject, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type UseBottomSheetOutputType = {
  isReactionsBottomSheetOpen: boolean;
  isCommentsBottomSheetOpen: boolean;
  reactionsBottomSheetRef: MutableRefObject<BottomSheetModal>;
  commentsBottomSheetRef: MutableRefObject<BottomSheetModal>;
  userInfoBottomSheetRef: MutableRefObject<BottomSheetModal>;
  othersBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openReactionsBottomSheetToIndex: () => void;
  handleReactionBottomSheetVisibility: () => void;
  openCommentsBottomSheetToIndex: () => void;
  openUserInfoBottomSheetRefBottomSheetToIndex: () => void;
  openOthersBottomSheetToIndex: (index: number) => void;
  closeReactionsBottomSheet: () => void;
  onReactionsBottomSheetClose: () => void;
  closeCommentsBottomSheet: () => void;
  closeUserInfoBottomSheetRefBottomSheet: () => void;
  closeOthersBottomSheet: () => void;
};

export const useBottomSheet = (): UseBottomSheetOutputType => {
  // full screen内でのmodalがなんかおかしい。。。だからuseState使ってさらに制御する。
  const [isReactionsBottomSheetOpen, setIsReactionsBottomSheetOpen] = useState<boolean>(false);
  const [isCommentsBottomSheetOpen, setIsCommentsBottomSheetOpen] = useState<boolean>(false);
  const reactionsBottomSheetRef = useRef<BottomSheetModal>(null);
  const commentsBottomSheetRef = useRef<BottomSheetModal>(null);
  const userInfoBottomSheetRef = useRef<BottomSheetModal>(null);
  const othersBottomSheetRef = useRef<BottomSheetModal>(null);

  const handleReactionBottomSheetVisibility = () => {
    reactionsBottomSheetRef.current?.snapToIndex(0);
    setIsReactionsBottomSheetOpen(true);
  };

  const openReactionsBottomSheetToIndex = () => {
    reactionsBottomSheetRef.current?.snapToIndex(0);
  };
  const openCommentsBottomSheetToIndex = () => {
    commentsBottomSheetRef.current?.snapToIndex(0);
  };
  const openUserInfoBottomSheetRefBottomSheetToIndex = () => {
    userInfoBottomSheetRef.current?.snapToIndex(0);
  };
  const openOthersBottomSheetToIndex = (index: number) => {
    othersBottomSheetRef.current?.snapToIndex(index);
  };

  const closeReactionsBottomSheet = () => {
    reactionsBottomSheetRef.current?.close();
  };

  const onReactionsBottomSheetClose = () => {
    setIsReactionsBottomSheetOpen(false);
  };

  const closeCommentsBottomSheet = () => {
    commentsBottomSheetRef.current?.close();
  };
  const closeUserInfoBottomSheetRefBottomSheet = () => {
    userInfoBottomSheetRef.current?.close();
  };
  const closeOthersBottomSheet = () => {
    othersBottomSheetRef.current?.close();
  };

  return {
    isReactionsBottomSheetOpen,
    isCommentsBottomSheetOpen,
    reactionsBottomSheetRef,
    commentsBottomSheetRef,
    userInfoBottomSheetRef,
    othersBottomSheetRef,
    openReactionsBottomSheetToIndex,
    handleReactionBottomSheetVisibility,
    openCommentsBottomSheetToIndex,
    openUserInfoBottomSheetRefBottomSheetToIndex,
    openOthersBottomSheetToIndex,
    closeReactionsBottomSheet,
    onReactionsBottomSheetClose,
    closeCommentsBottomSheet,
    closeUserInfoBottomSheetRefBottomSheet,
    closeOthersBottomSheet,
  };
};
