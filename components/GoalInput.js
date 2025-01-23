import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  Pressable,
  Image,
} from 'react-native';

function GoalInput({ addGoalHandler, isModalVisible, handleToggleModal }) {
  const [goalVal, setGoalVal] = useState('');
  const [btnText, setBtnText] = useState('Cancel');

  function handleSubmitGoal() {
    setBtnText((prev) => (prev = 'Cancel'));
    addGoalHandler(goalVal);
    setGoalVal('');
    handleCancel();
  }

  function handleCancel() {
    setGoalVal('');
    setBtnText('Cancel');
    handleToggleModal();
  }

  function handleGoalTextInput(text) {
    console.log('text Length: ', text.length);
    if (text.trim().length > 0) {
      setBtnText('Add Goal');
    } else {
      setBtnText('Cancel');
    }
    setGoalVal(text);
  }

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/goal.png')}
        />
        <TextInput
          autoFocus={true}
          onSubmitEditing={handleSubmitGoal}
          onChangeText={handleGoalTextInput}
          style={styles.textInput}
          placeholder="Your course goal"
          value={goalVal}
        />

        <Pressable disabled={btnText === 'Cancel'} onPress={handleSubmitGoal}>
          <Text
            style={btnText !== 'Cancel' ? styles.btn : styles.hiddenBtn}
            visible={btnText !== 'Cancel'}
            animationType="fade"
          >
            {btnText === 'Cancel' ? '' : btnText}
          </Text>
        </Pressable>
        <Button color="orange" title="Cancel" onPress={() => handleCancel()} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    flexDirection: 'column',
    backgroundColor: '#dddddd',
    paddingTop: 150,
  },
  textInput: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#111111',
    height: 50,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#232323',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 100,
    marginHorizontal: 'auto',
    marginBottom: 50,
  },
  btn: {
    textAlign: 'center',
    paddingVertical: 15,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: '#832898',
    color: 'white',
  },
  hiddenBtn: {
    visible: 'none',
    paddingVertical: 15,
    fontSize: 20,
    borderWidth: 0,
    borderRadius: 5,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default GoalInput;
