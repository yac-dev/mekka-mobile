import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Report } from '../../../components';
import { AppButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { ViewPostStackNavigatorProps } from '../../ViewPost/navigations/ViewPostStackNavigator';
import { VectorIcon } from '../../../Icons';

class ReportPostOption implements ReportPostOptionType {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

export type ReportPostOptionType = {
  value: string;
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
  const [selectedReportOptionValue, setSelectedReportOptionValue] = useState<string>(null);

  const onSendPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onSendPress()} disabled={selectedReportOptionValue ? false : true}>
          <Text
            style={{
              color: selectedReportOptionValue ? 'white' : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [selectedReportOptionValue]);

  const onSelectedOptionChange = (option: ReportPostOptionType) => {
    setSelectedReportOptionValue(option.value);
  };

  return (
    <Report
      title='Something wrong with this post?'
      options={options}
      selectedOptionValue={selectedReportOptionValue}
      onSelectedOptionChange={onSelectedOptionChange}
      content={<View></View>}
    />
  );
};
