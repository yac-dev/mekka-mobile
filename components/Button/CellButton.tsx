import { ReactNode } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VectorIcon } from '../../Icons';
import { Colors } from '../../themes';

type CellButtonProps = {
  onButtonPress: () => void;
  children: ReactNode;
  title: string;
  subTitle?: string;
  customStyle?: ViewStyle;
  info?: ReactNode;
};

export const CellButton: React.FC<CellButtonProps> = ({
  onButtonPress,
  children,
  title,
  subTitle,
  customStyle,
  info,
}) => {
  return (
    <TouchableOpacity style={[styles.container, { ...customStyle }]} onPress={onButtonPress} activeOpacity={0.5}>
      <View style={styles.iconAndTextContainer}>
        {children}
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
      {info}
      <VectorIcon.MCI name='chevron-right' color='white' size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  iconAndTextContainer: { flexDirection: 'row', alignItems: 'center' },
  title: {
    color: Colors.white,
    fontSize: 17,
    marginBottom: 5,
  },
  subTitle: {
    color: Colors.white170,
    fontSize: 13,
  },
});
