import { useRef, MutableRefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { constSelector } from 'recoil';

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
  currentUserBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openCurrentUserBottomSheet: (index: number) => void;
  closeCurrentUserBottomSheet: () => void;
  chooseViewBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openChooseViewBottomSheet: (index: number) => void;
  closeChooseViewBottomSheet: () => void;
  appBlogWebviewBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAppBlogWebviewBottomSheet: (index: number) => void;
  closeAppBlogWebviewBottomSheet: () => void;
};

export const useBottomSheet = (): UseBottomSheetOutputType => {
  const addNewPostMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const authMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const addNewSpaceMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const aboutSpaceBottomSheetRef = useRef<BottomSheetModal>(null);
  const currentUserBottomSheetRef = useRef<BottomSheetModal>(null);
  const chooseViewBottomSheetRef = useRef<BottomSheetModal>(null);
  const appBlogWebviewBottomSheetRef = useRef<BottomSheetModal>(null);

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

  // この関数をglobalに持っておくことできる？？
  const openCurrentUserBottomSheet = (index: number) => {
    currentUserBottomSheetRef.current?.snapToIndex(index);
  };

  const closeCurrentUserBottomSheet = () => {
    currentUserBottomSheetRef.current?.close();
  };

  const openChooseViewBottomSheet = (index: number) => {
    chooseViewBottomSheetRef.current?.snapToIndex(index);
  };

  const closeChooseViewBottomSheet = () => {
    chooseViewBottomSheetRef.current?.close();
  };

  const openAppBlogWebviewBottomSheet = (index: number) => {
    appBlogWebviewBottomSheetRef.current?.snapToIndex(index);
  };

  const closeAppBlogWebviewBottomSheet = () => {
    appBlogWebviewBottomSheetRef.current?.close();
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
    currentUserBottomSheetRef,
    openCurrentUserBottomSheet,
    closeCurrentUserBottomSheet,
    chooseViewBottomSheetRef,
    openChooseViewBottomSheet,
    closeChooseViewBottomSheet,
    appBlogWebviewBottomSheetRef,
    openAppBlogWebviewBottomSheet,
    closeAppBlogWebviewBottomSheet,
  };
};
