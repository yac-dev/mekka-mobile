import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Report } from '../../components';

type ReportPostOptionType = string;

const options: ReportPostOptionType[] = ['report 1', 'report 2', 'report 3', 'report 4'];

//  routingかな。。。
type IReportPost = {};

export const ReportPost: React.FC<IReportPost> = ({}) => {
  const [selectedOption, setSelectedOption] = useState<ReportPostOptionType>('');

  const renderItem = ({ item, index }: { item: ReportPostOptionType; index: number }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return <Report title='Report for comment.' options={options} renderItem={renderItem} content={<View></View>} />;
};
