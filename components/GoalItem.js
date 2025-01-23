import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
function GoalItem({ goalData, deleteGoalByID }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.title.container}>
        <Text>{goalData.index + 1}:</Text>
        <Text style={styles.title.text}>{goalData.item.title}</Text>
      </View>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={deleteGoalByID.bind(this, goalData.item.id)}
      >
        <View style={styles.deleteBtn.btn}>
          <Text style={styles.deleteBtn.text}>X</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  title: {
    container: {
      flexDirection: 'row',
      flex: 1,
      gap: 2,
    },
    text: {
      width: '90%',
      fontSize: 20,
    },
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    borderRadius: 3,
    justifyContent: 'space-between',
  },

  deleteBtn: {
    btn: {
      paddingVertical: 3,
      paddingHorizontal: 5,
      borderWidth: 1,
      borderRadius: 3,
      backgroundColor: 'red',
    },
    text: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
  },
});

export default GoalItem;
