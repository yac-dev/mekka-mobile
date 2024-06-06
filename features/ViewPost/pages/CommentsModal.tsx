import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';

type ICommentModal = {
  isModalVisible: boolean;
  handleModalVisibility: () => void;
};

export const CommentsModal: React.FC<ICommentModal> = ({ isModalVisible, handleModalVisibility }) => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal animationType='fade' transparent={true} visible={isModalVisible}>
        <View style={styles.modalView}>
          <AppButton.Icon
            onButtonPress={handleModalVisibility}
            customStyle={{
              width: 28,
              height: 28,
              backgroundColor: 'rgb(50,50,50)',
              position: 'absolute',
              top: 27,
              left: 17,
            }}
            hasShadow={false}
          >
            <VectorIcon.II name='close' size={18} color={Colors.white} />
          </AppButton.Icon>
          <Text style={{ color: 'red' }}>Hello World!</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,0.7)',
    paddingTop: 100,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
