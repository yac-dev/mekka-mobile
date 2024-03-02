import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextColor, BackgroundColor } from '../../themes';

type PageScreenWithTitleProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

export const PageScreenWithTitle: React.FC<PageScreenWithTitleProps> = ({ title, subTitle, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor.primary,
  },
  titleContainer: { paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 40 },
  title: {
    color: TextColor.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  subTitle: { color: TextColor.secondary, textAlign: 'center' },
});
