import { useRef, MutableRefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type UseBottomSheetOutputType = {
  authMenuBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAuthMenuBottomSheet: (index: number) => void;
  closeAuthMenuBottomSheet: () => void;
  addNewSpaceMenuBottomSheetRef: MutableRefObject<BottomSheetModal>;
  openAddNewSpaceMenuBottomSheet: (index: number) => void;
  closeAddNewSpaceMenuBottomSheet: () => void;
};

export const useBottomSheet = (): UseBottomSheetOutputType => {
  const authMenuBottomSheetRef = useRef<BottomSheetModal>(null);
  const addNewSpaceMenuBottomSheetRef = useRef<BottomSheetModal>(null);

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

  return {
    authMenuBottomSheetRef,
    openAuthMenuBottomSheet,
    closeAuthMenuBottomSheet,
    addNewSpaceMenuBottomSheetRef,
    openAddNewSpaceMenuBottomSheet,
    closeAddNewSpaceMenuBottomSheet,
  };
};
