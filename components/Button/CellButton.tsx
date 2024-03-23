import { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { VectorIcon } from '../../Icons';
import { TextColor } from '../../themes';

type CellButtonProps = {
  onButtonPress: () => void;
  children: ReactNode;
  title: string;
  subTitle?: string;
};

export const CellButton: React.FC<CellButtonProps> = ({ onButtonPress, children, title, subTitle }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onButtonPress} activeOpacity={1}>
      <View style={styles.iconAndTextContainer}>
        {children}
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
      <VectorIcon.MCI name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndTextContainer: { flexDirection: 'row', alignItems: 'center' },
  title: { color: TextColor.primary, fontSize: 17, marginBottom: 5 },
  subTitle: { color: TextColor.secondary, fontSize: 13 },
});
