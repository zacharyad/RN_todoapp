import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useState } from 'react';
import { GoalItem, GoalInput } from './components';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  let [currId, setId] = useState(1);
  let [goals, setGoals] = useState([]);
  let [isModalVisible, toggleModalVisible] = useState(false);

  function addGoalHandler(goalValStr) {
    if (goalValStr.trim() === '') return;
    let newGoal = { title: goalValStr, id: currId };
    setId(currId + 1);
    setGoals((prev) => [...prev, newGoal]);
  }

  function deleteGoalByID(ID) {
    setGoals(goals.filter(({ id }) => id !== ID));
  }

  function handleToggleModal(close = false) {
    if (close) {
      toggleModalVisible(false);
    } else {
      toggleModalVisible((prev) => !prev);
    }
  }

  return (
    <>
      <StatusBar style="dark" />

      <View style={styles.appContainer}>
        <View style={styles.goalsContainer}>
          <Text>List of Goals:</Text>

          <FlatList
            ListEmptyComponent={() => (
              <Text style={styles.emptyGoalsText}>No goals added yet...</Text>
            )}
            keyExtractor={(item, _) => {
              return item.id;
            }}
            data={goals}
            renderItem={(goalData) => {
              return (
                <GoalItem goalData={goalData} deleteGoalByID={deleteGoalByID} />
              );
            }}
          />
        </View>
        <Button title="Create New Goal" onPress={() => handleToggleModal()} />
        <GoalInput
          addGoalHandler={addGoalHandler}
          isModalVisible={isModalVisible}
          handleToggleModal={handleToggleModal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#eeeeee',
    flex: 1,
    paddingVertical: 75,
    paddingHorizontal: 15,
    display: 'flex',
    justifyContent: 'center',
  },
  goalsContainer: {
    flex: 3,
    paddingVertical: 5,
  },
  emptyGoalsText: {
    color: '#23232370',
    marginTop: 5,
  },
});
