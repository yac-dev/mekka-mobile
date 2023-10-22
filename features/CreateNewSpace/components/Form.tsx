import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import NameForm from './CreateNewSpace/NameForm';
import IconForm from './CreateNewSpace/IconForm';
import VisibilityForm from './CreateNewSpace/VisibilityForm';
import ContentTypeForm from './CreateNewSpace/ContentTypeForm';
import CommentForm from './CreateNewSpace/CommentForm';
import ReactionForm from './CreateNewSpace/ReactionForm';
import Description from './CreateNewSpace/DescriptionForm';
import AddTagForm from './CreateNewSpace/AddTagForm';
import MomentForm from './CreateNewSpace/MomentForm';

const Form = () => {
  return (
    <ScrollView>
      <NameForm />
      <IconForm />
      <VisibilityForm />
      <ContentTypeForm />
      <MomentForm />
      <CommentForm />
      <ReactionForm />
      <Description />
      {/* <AddTagForm /> */}
    </ScrollView>
  );
};

export default Form;
