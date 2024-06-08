import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Report } from '../../components';

type ReportCommentOptionType = string;

const options: ReportCommentOptionType[] = ['report 1', 'report 2', 'report 3', 'report 4'];

//  routingかな。。。
type IReportComment = {};

export const ReportComment: React.FC<IReportComment> = ({}) => {
  const [selectedOption, setSelectedOption] = useState<ReportCommentOptionType>('');

  const renderItem = ({ item, index }: { item: ReportCommentOptionType; index: number }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return <Report title='Report for comment.' options={options} renderItem={renderItem} content={<View></View>} />;
};
