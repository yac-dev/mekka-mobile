import React from 'react';
import { View, Text } from 'react-native';
import NameForm from './CreateNewSpace/NameForm';
import IconForm from './CreateNewSpace/IconForm';
import VisibilityForm from './CreateNewSpace/VisibilityForm';
import ContentTypeForm from './CreateNewSpace/ContentTypeForm';
import CommentForm from './CreateNewSpace/CommentForm';
import ReactionForm from './CreateNewSpace/ReactionForm';

const Form = () => {
  return (
    <View>
      <NameForm />
      <IconForm />
      <VisibilityForm />
      <ContentTypeForm />
      <CommentForm />
      <ReactionForm />
    </View>
  );
};

export default Form;
