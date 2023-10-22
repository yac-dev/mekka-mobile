import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  InputAccessoryView,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ReportMeetup = (props) => {
  const inputAccessoryViewID = 'REPORT_MEETUP';
  const [reportIssueOptions, setReportIssueOptions] = useState({
    spam: {
      label: 'spam',
      reason: 'Spam',
    },
    nudity: {
      label: 'nudity',
      reason: 'Nudity or sexual activity',
    },
    hateSpeech: {
      label: 'hateSpeech',
      reason: 'Hate speech or symbols',
    },
    falseInformation: {
      label: 'falseInformation',
      reason: 'False information',
    },
    bullying: {
      label: 'bullying',
      reason: 'Bullying or harassment',
    },
    scam: {
      label: 'scam',
      reason: 'Scam or fraud',
    },
    violence: {
      label: 'violence',
      reason: 'Violence or dangerous organizations',
    },
    intellectual: {
      label: 'intellectual',
      reason: 'Intellectual property violation',
    },
    sale: {
      label: 'sale',
      reason: 'Sale of illegal or regurated goods',
    },
    suicide: {
      label: 'suicide',
      reason: 'Suicide or self-injury',
    },
  });

  const [selectedIssue, setSelectedIssue] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [description, setDescription] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => props.navigation.goBack()} disabled={isSubmitDisabled ? true : false}>
          <Text
            style={{
              color: isSubmitDisabled ? 'rgb(150,150,150)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [isSubmitDisabled]);

  useEffect(() => {
    if (Object.keys(selectedIssue).length !== 0) {
      if (!description.length) {
        setIsSubmitDisabled(true);
      } else {
        setIsSubmitDisabled(false);
      }
    } else {
      setIsSubmitDisabled(true);
    }
  }, [selectedIssue, description]);

  const renderReportIssueOptions = () => {
    const list = Object.values(reportIssueOptions).map((reportIssue, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
          onPress={() => setSelectedIssue(reportIssue)}
        >
          <Text style={{ color: 'rgb(170,170,170)', marginRight: 15 }}>{reportIssue.reason}</Text>
          {reportIssue.label === selectedIssue.label ? (
            <MaterialCommunityIcons name='check-circle' color={'green'} size={15} />
          ) : null}
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView style={{ marginBottom: 30, backgroundColor: 'rgb(50,50,50)', borderRadius: 10, height: 200 }}>
        {list}
      </ScrollView>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={70}
      style={{ flex: 1, backgroundColor: 'black', padding: 20 }}
      // contentContainerStyle={{ paddingBottom: 30 }}
    >
      <ScrollView>
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Report Space
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            What happened in this space? Please choose a issue option down below. Your report will be sent to developer.
          </Text>
        </View>
        {renderReportIssueOptions()}
        <Text style={{ color: 'rgb(170,170,170)', marginBottom: 10 }}>
          Please write about the problem more specifically.
        </Text>
        <TextInput
          inputAccessoryViewID={inputAccessoryViewID}
          placeholderTextColor={'rgb(170,170,170)'}
          style={{
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 7,
            padding: 10,
            marginBottom: 10,
            height: 100,
            color: 'rgb(170,170,170)',
          }}
          multiline={true}
          value={description}
          onChangeText={setDescription}
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
              <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
        <View style={{ alignSelf: 'center' }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ReportMeetup;
