import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FD, II } from '../Icons';
import { Colors } from '../themes';
import { SnackBarStatusType, SnackBarType } from '../types';

type SnackBarStatusTableType = {
  [key in SnackBarStatusType]: {
    backgroundColor: string;
    Node: React.ReactNode;
  };
};

const SnackBarStatusTable: SnackBarStatusTableType = {
  success: {
    backgroundColor: Colors.lightGreen,
    Node: <II name='checkmark-circle' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  info: {
    backgroundColor: Colors.blue,
    Node: <II name='information-circle-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  warning: {
    backgroundColor: Colors.yellow,
    Node: <II name='ios-warning-sharp' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
  error: {
    backgroundColor: Colors.red,
    Node: <FD name='prohibited' size={20} color={'white'} style={{ marginRight: 10 }} />,
  },
};

type SnackBarProps = {
  snackBar: SnackBarType;
  hideSnackBar: () => void;
  onClosePress?: () => void;
  onSnackBarDismiss?: () => void;
};

// snackbarの表示stateは親で、それを隠すfunctionも渡してくればいい。
export const SnackBar: React.FC<SnackBarProps> = ({ snackBar, hideSnackBar, onClosePress, onSnackBarDismiss }) => {
  useEffect(() => {
    if (snackBar.isVisible) {
      setTimeout(() => {
        hideSnackBar();
      }, snackBar.duration);
    }
  }, [snackBar.isVisible]);

  if (!snackBar.isVisible) {
    return null;
  }

  return (
    <Snackbar
      wrapperStyle={styles.wrapperStyle}
      style={{
        backgroundColor: SnackBarStatusTable[snackBar.status].backgroundColor,
      }}
      visible={snackBar.isVisible}
      onDismiss={onSnackBarDismiss}
      // WARNING: ここ、stringしか無理っぽい。
      action={{
        label: <Text style={{ color: Colors.white }}>Close</Text>,
        onPress: onClosePress,
      }}
    >
      <View style={styles.contentContainer}>
        {SnackBarStatusTable[snackBar.status].Node}
        <Text style={styles.message}>{snackBar.message}</Text>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  wrapperStyle: {
    bottom: 5,
    alignSelf: 'center',
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center' },
  message: {
    color: Colors.white,
  },
});
