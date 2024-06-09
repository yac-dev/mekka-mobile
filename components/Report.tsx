import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  InputAccessoryView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { VectorIcon } from '../Icons';
import { ReportOptionType } from '../features/ReportPost/ReportPost';

type IReport<T> = {
  title: string; // commentに対するreportなり、userに対するreportなり分けていく感じ。
  options: ReportOptionType[];
  selectedOptionValue: string;
  onSelectedOptionChange: (option: ReportOptionType) => void;
  textInput?: string;
  onTextInputChange?: (textinput: string) => void;
  content: React.ReactNode;
};

// user reportでは、'report 誰々'っていうタイトルになるし、
// comment reportでは、'report comment'　みたいになるし、
// post reportでは、'what's the problem with this post?'みたいになるし
// 色々だよね。これはreportの種類によって分ける様にした方がいい。
//ただ共通な部分は作っておく。

// だから、navigation でparamsを受け取るわけだが、そのparamsのものをcontentで作って、それをReportに埋め込む形になるんだと思う。
// このoptionsに関しても、T故にここでflatListで展開することはできない、だから消費する親componentでrenderitemを作って、それをここに埋め込む形かなおそらく。

const inputAccessoryViewID = 'REPORT_INPUT';
export const Report = <T,>({
  title,
  options,
  selectedOptionValue,
  onSelectedOptionChange,
  textInput,
  onTextInputChange,
  content,
}: IReport<T>) => {
  const renderItem = (item: { value: string; label: string }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === selectedOptionValue && (
          <VectorIcon.AD style={styles.icon} color='black' name='Safety' size={20} />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingHorizontal: 10, paddingTop: 40 }}>
      <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 17, marginBottom: 30 }}>
        {title}
      </Text>
      {content}
      {/* half modalとの相性があまり良くないね。full screen modalに変更した。 */}
      <View style={{ margin: 10 }}>
        <Text style={{ color: 'rgb(170,170,170)' }}>Please choose the reason .</Text>
      </View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={options}
        labelField='label'
        valueField='value'
        placeholder='Choose a reason from the options below'
        value={selectedOptionValue}
        onChange={onSelectedOptionChange}
        renderLeftIcon={() => <VectorIcon.AD style={styles.icon} color='white' name='Safety' size={20} />}
        renderItem={renderItem}
        containerStyle={styles.optionsContainer}
        activeColor='rgb(80,80,80)'
      />
      <View style={{ margin: 10 }}>
        <Text style={{ color: 'rgb(170,170,170)', marginBottom: 10 }}>
          Please write about the problem more specifically.
        </Text>
        <TextInput
          inputAccessoryViewID={inputAccessoryViewID}
          placeholderTextColor={'white'}
          style={{
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 7,
            padding: 10,
            marginBottom: 10,
            height: 120,
            color: 'white',
          }}
          multiline={true}
          value={textInput}
          onChangeText={onTextInputChange}
          autoCapitalize='none'
        />
        <InputAccessoryView
          nativeID={inputAccessoryViewID}
          backgroundColor={'rgb(50,50,50)'}
          // style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10 }}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <Text style={{ color: 'white', padding: 15, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 50,
    backgroundColor: 'rgb(50,50,50)',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  optionsContainer: {
    backgroundColor: 'rgb(50,50,50)', // Set the background color
    borderRadius: 10, // Set the border radius
    padding: 5, // Optional: add padding if needed
    borderColor: 'rgb(50,50,50)',
    // Add any other styles you want for the container
  },
});
