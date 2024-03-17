import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FD, II } from '../../Icons';
import { BackgroundColor, TextColor } from '../../themes';
import { SnackBarStatusType } from '../../types';
import { SnackBarContext } from '../../providers';

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
export const PrimarySnackBar: React.FC = () => {
  const { snackBar, setSnackBar } = useContext(SnackBarContext);
  useEffect(() => {
    if (snackBar.isVisible) {
      setTimeout(() => {
        setSnackBar({
          isVisible: false,
          status: void 0,
          message: void 0,
          duration: void 0,
        });
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
      onDismiss={() =>
        setSnackBar({
          isVisible: false,
          status: void 0,
          message: void 0,
          duration: void 0,
        })
      }
      // WARNING: ここ、stringしか無理っぽい。
      action={{
        label: <Text style={{ color: TextColor.primary }}>Close</Text>,
        onPress: () =>
          setSnackBar({
            isVisible: false,
            status: void 0,
            message: void 0,
            duration: void 0,
          }),
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
    color: TextColor.primary,
  },
});
