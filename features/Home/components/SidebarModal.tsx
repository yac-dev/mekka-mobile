import React from 'react';
import { View, Text, Modal } from 'react-native';

type SidebarModalProps = {
  isVisible: boolean;
};

export const SidebarModal = ({ isVisible }: SidebarModalProps) => {
  return <Modal testID={'modal'} visible={isVisible} animationType='slide'></Modal>;
};
