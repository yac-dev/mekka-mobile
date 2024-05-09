import { useRef, MutableRefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type UseBottomSheetOutputType = {
  ref: MutableRefObject<BottomSheetModal>;
  openModalToIndex: (index: number) => void;
  closeModal: () => void;
};

export const useBottomSheet = (): UseBottomSheetOutputType => {
  const ref = useRef<BottomSheetModal>(null);

  const openModalToIndex = (index: number) => {
    ref.current?.snapToIndex(index);
  };

  const closeModal = () => {
    ref.current?.close();
  };

  return {
    ref,
    openModalToIndex,
    closeModal,
  };
};
