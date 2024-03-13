import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FD, II } from '../../Icons';
import { BackgroundColor, TextColor } from '../../themes';
import { SnackBarStatusType } from '../../types';

type SnackBarStatusTableType = {
  [key in SnackBarStatusType]: {
    backgroundColor: string;
    Node: React.ReactNode;
  };
};

const SnackBarStatusTable: SnackBarStatusTableType = {
  success: {
    backgroundColor: BackgroundColor.lightGreen,
    Node: <II name='checkmark-circle' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  info: {
    backgroundColor: BackgroundColor.blue,
    Node: <II name='information-circle-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  warning: {
    backgroundColor: BackgroundColor.yellow,
    Node: <II name='ios-warning-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  error: {
    backgroundColor: BackgroundColor.red,
    Node: <FD name='prohibited' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
};

type PrimarySnackBarProps = {
  isVisible: boolean;
  status: SnackBarStatusType;
  message: string;
  duration: number;
  hideSnackBar: () => void;
};

// snackbarの表示stateは親で、それを隠すfunctionも渡してくればいい。
export const TopSnackbar: React.FC<PrimarySnackBarProps> = ({ isVisible, status, message, duration, hideSnackBar }) => {
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
      wrapperStyle={styles.wrapperStyle}
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
      <View style={styles.contentContainer}>
        {SnackBarStatusTable[status].Node}
        <Text style={styles.message}>{message}</Text>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    top: 5,
    alignSelf: 'center',
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center' },
  message: {
    color: TextColor.primary,
  },
});
