import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Report, AppButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { SpaceDetailStackNavigatorProp } from '../../Discover/navigations/SpaceDetailStackNavigator';
import { VectorIcon } from '../../../Icons';

class ReportPostOption implements ReportOptionType {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}

type ReportOptionType = {
  value: string;
  label: string;
};

const options: ReportOptionType[] = [
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

type IReportSpace = {};

export const ReportSpace: React.FC<IReportSpace> = ({}) => {
  const navigation = useNavigation<SpaceDetailStackNavigatorProp>();
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

  const onSelectedOptionChange = (option: ReportOptionType) => {
    setSelectedReportOptionValue(option.value);
  };

  return (
    <Report
      title='Something wrong with this space?'
      options={options}
      selectedOptionValue={selectedReportOptionValue}
      onSelectedOptionChange={onSelectedOptionChange}
      content={<View></View>}
    />
  );
};
