import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const wordsArray = ['Apple', 'Banana', 'Cat', 'Dog', 'Elephant', 'Flower'];

const Page = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Reset the word index when the component mounts
    setCurrentWordIndex(0);
  }, []);

  const showNextWord = () => {
    if (currentWordIndex < wordsArray.length - 1) {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.word}>{wordsArray[currentWordIndex]}</Text>
      <TouchableOpacity onPress={showNextWord} style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Page;