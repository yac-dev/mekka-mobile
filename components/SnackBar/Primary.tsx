import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { yellow, red, lightGreen, blue } from '../../themes';

type SnackBarStatusType = 'success' | 'warning' | 'info' | 'error';

type PrimarySnackBarProps = {
  isVisible: boolean;
  status: SnackBarStatusType;
  message: string;
  duration: number;
  hideSnackBar: () => void;
};

type SnackBarStatusTableType = {
  [key in SnackBarStatusType]: {
    backgroundColor: string;
    Node: React.ReactNode;
  };
};

const SnackBarStatusTable: SnackBarStatusTableType = {
  success: {
    backgroundColor: lightGreen,
    Node: <Ionicons name='checkmark-circle' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  info: {
    backgroundColor: blue,
    Node: <Ionicons name='information-circle-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  warning: {
    backgroundColor: yellow,
    Node: <Ionicons name='ios-warning-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  error: {
    backgroundColor: red,
    Node: <Foundation name='prohibited' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
};

// snackbarの表示stateは親で、それを隠すfunctionも渡してくればいい。
export const Primary: React.FC<PrimarySnackBarProps> = ({ isVisible, status, message, duration, hideSnackBar }) => {
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        hideSnackBar();
      }, duration);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <Snackbar
      wrapperStyle={{ top: 5, alignSelf: 'center' }}
      style={{
        backgroundColor: SnackBarStatusTable[status].backgroundColor,
      }}
      visible={isVisible}
      onDismiss={() => hideSnackBar()}
      action={{
        label: 'Close',
        onPress: () => hideSnackBar(),
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {SnackBarStatusTable[status].Node}
        <Text style={{ color: 'white' }}>{message}</Text>
      </View>
    </Snackbar>
  );
};
