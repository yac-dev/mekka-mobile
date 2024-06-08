import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Report } from '../../components';
import { AppButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { ViewPostStackNavigatorProps } from '../../navigations/ViewPostStackNavigator';
import { VectorIcon } from '../../Icons';

// 共通のtype使いたいから方はつけたい。

class ReportPostOption implements ReportPostOptionType {
  key: string;
  label: string;

  constructor(key: string, label: string) {
    this.key = key;
    this.label = label;
  }
}

type ReportPostOptionType = {
  key: string;
  label: string;
};

const options: ReportPostOptionType[] = [
  new ReportPostOption('spam', 'Spam'),
  new ReportPostOption('nudity', 'Nudity or sexual activity'),
  new ReportPostOption('hateSpeech', 'Hate speech or symbols'),
  new ReportPostOption('falseInformation', 'False information'),
  new ReportPostOption('bullying', 'Bullying or harassment'),
  new ReportPostOption('scam', 'Scam or fraud'),
  new ReportPostOption('violence', 'Violence or dangerous organizations'),
  new ReportPostOption('intellectual', 'Intellectual property violation'),
  new ReportPostOption('sale', 'Sale of illegal or regurated goods'),
  new ReportPostOption('suicide', 'Suicide or self-injury'),
];

type IReportPost = {};

export const ReportPost: React.FC<IReportPost> = ({}) => {
  const navigation = useNavigation<ViewPostStackNavigatorProps>();
  const [selectedOption, setSelectedOption] = useState<ReportPostOptionType | undefined>();

  const onDonePress = () => {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedOption]);

  const onOptionPress = (option: ReportPostOptionType) => {
    setSelectedOption(option);
  };

  const renderItem = ({ item, index }: { item: ReportPostOptionType; index: number }) => {
    const isSelected = item.key === selectedOption.key;

    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => onOptionPress(item)}
      >
        <Text>{item.label}</Text>
        {isSelected && <VectorIcon.II name='add' color='white' size={15} />}
      </TouchableOpacity>
    );
  };

  return (
    <Report
      title='Something wrong with this comment?'
      options={options}
      renderItem={renderItem}
      content={<View></View>}
    />
  );
};
