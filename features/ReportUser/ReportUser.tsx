import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Report } from '../../components';

type ReportUserOptionType = string;

const options: ReportUserOptionType[] = ['report 1', 'report 2', 'report 3', 'report 4'];

//  routingかな。。。
type IReportUser = {};

export const ReportUser: React.FC<IReportUser> = ({}) => {
  const [selectedOption, setSelectedOption] = useState<ReportUserOptionType>('');

  const renderItem = ({ item, index }: { item: ReportUserOptionType; index: number }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return <Report title='Report for comment.' options={options} renderItem={renderItem} content={<View></View>} />;
};
