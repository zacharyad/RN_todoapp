import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import { useState } from 'react';

export default function App() {
  let [currId, setId] = useState(1);
  let [goalVal, setGoalVal] = useState('');
  let [goals, setGoals] = useState([]);

  function goalInputHandler(text) {
    setGoalVal((prev) => text);
  }

  function addGoalHandler() {
    if (goalVal.trim() === '') return;
    let newGoal = { title: goalVal, id: currId };
    setGoalVal('');
    setId(currId + 1);
    setGoals((prev) => [...prev, newGoal]);
  }

  function handleEnter() {
    addGoalHandler();
  }

  function deleteGoalByID(ID) {
    setGoals(goals.filter(({ id }) => id !== ID));
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          onSubmitEditing={handleEnter}
          onChangeText={goalInputHandler}
          style={styles.textInput}
          placeholder="Your course goal"
          value={goalVal}
        />

        <View style={styles.btn}>
          <Button title="Add Goal" onPress={addGoalHandler} />
        </View>
      </View>
      <View style={styles.goalsContainer}>
        <Text>List of Goals:</Text>

        <FlatList
          ListEmptyComponent={() => (
            <Text style={{ color: '#23232370', marginTop: 5 }}>
              No goals added yet...
            </Text>
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          data={goals}
          renderItem={(goalData) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  padding: 5,
                  marginVertical: 5,
                  borderRadius: 5,
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                  }}
                >
                  <Text>{goalData.index + 1}: </Text>
                  <Text style={{ width: '90%' }}>{goalData.item.title}</Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    backgroundColor: 'red',
                  }}
                >
                  <Button
                    color={'white'}
                    title="delete"
                    onPress={() => deleteGoalByID(goalData.item.id)}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 24,
    borderBottomWidth: 1,
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderColor: '#cccccc',

    paddingLeft: 10,
    borderRadius: 5,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    marginLeft: 5,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  goalsContainer: {
    flex: 3,
  },
});
