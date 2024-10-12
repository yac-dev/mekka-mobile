import { useRef, MutableRefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type UseBottomSheetOutputType = {
  addNewPostMenuBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAddNewPostMenuBottomSheet: (index: number) => void;
  closeAddNewPostMenuBottomSheet: () => void;
  authMenuBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAuthMenuBottomSheet: (index: number) => void;
  closeAuthMenuBottomSheet: () => void;
  addNewSpaceMenuBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  closeAddNewSpaceMenuBottomSheet: () => void;
  aboutSpaceBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAboutSpaceBottomSheet: (index: number) => void;
  closeAboutSpaceBottomSheet: () => void;
};

export const useBottomSheet = (): UseBottomSheetOutputType => {
  const addNewPostMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const authMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const addNewSpaceMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const aboutSpaceBottomSheetRef = useRef<BottomSheetModal>(null);

  const openAddNewPostMenuBottomSheet = (index: number) => {
    addNewPostMenuBottomSheetRef.current?.snapToIndex(index);
  };

  const closeAddNewPostMenuBottomSheet = () => {
    addNewPostMenuBottomSheetRef.current?.close();
  };

  const openAuthMenuBottomSheet = (index: number) => {
    authMenuBottomSheetRef.current?.snapToIndex(index);
  };

  const closeAuthMenuBottomSheet = () => {
    authMenuBottomSheetRef.current?.close();
  };

  const openAddNewSpaceMenuBottomSheet = (index: number) => {
    addNewSpaceMenuBottomSheetRef.current?.snapToIndex(index);
  };

  const closeAddNewSpaceMenuBottomSheet = () => {
    addNewSpaceMenuBottomSheetRef.current?.close();
  };

  const openAboutSpaceBottomSheet = (index: number) => {
    aboutSpaceBottomSheetRef.current?.snapToIndex(index);
  };

  const closeAboutSpaceBottomSheet = () => {
    aboutSpaceBottomSheetRef.current?.close();
  };

  return {
    addNewPostMenuBottomSheetRef,
    openAddNewPostMenuBottomSheet,
    closeAddNewPostMenuBottomSheet,
    authMenuBottomSheetRef,
    openAuthMenuBottomSheet,
    closeAuthMenuBottomSheet,
    addNewSpaceMenuBottomSheetRef,
    openAddNewSpaceMenuBottomSheet,
    closeAddNewSpaceMenuBottomSheet,
    aboutSpaceBottomSheetRef,
    openAboutSpaceBottomSheet,
    closeAboutSpaceBottomSheet,
  };
};
