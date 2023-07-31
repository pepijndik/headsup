// WordContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeadsUpContext = createContext({
  wordData: {},
  category: '',
  saveWord: () => {},
  removeWord: () => {},
  setCategory: () => {},
  clearWordData: () => {}
});

const HeadsUpProvider = ({ children }) => {
  const [wordData, setWordData] = useState({});
  const [category, setCategory] = useState('');

  // Load word data from AsyncStorage on component mount
  useEffect(() => {
    loadWordData();
  }, []);

  const loadWordData = async () => {
    try {
      const dataJson = await AsyncStorage.getItem('wordData');
      const wordData = dataJson ? JSON.parse(dataJson) : {};
      setWordData(wordData);
    } catch (error) {
      console.error('Error loading word data:', error);
    }
  };

  const clearWordData = async () => {
    try {
      setWordData({});
      await AsyncStorage.setItem("wordData",JSON.stringify({}));
    } catch (error) {
      console.error('Error clearing word data:', error);
    }
  }
  const saveWord = async (category, word) => {
    try {
      const updatedWords = wordData[category] ? [...wordData[category], word] : [word];
      const updatedWordData = { ...wordData, [category]: updatedWords };
      setWordData(updatedWordData);
      const dataJson = JSON.stringify(updatedWordData);
      await AsyncStorage.setItem('wordData', dataJson);
    } catch (error) {
      console.error('Error saving word:', error);
    }
  };

  const removeWord = async (category, word) => {
    try {
      if (!wordData[category]) return;

      const updatedWords = wordData[category].filter((w) => w !== word);
      setWordData({ ...wordData, [category]: updatedWords });
      const dataJson = JSON.stringify(wordData);
      await AsyncStorage.setItem('wordData', dataJson);
    } catch (error) {
      console.error('Error removing word:', error);
    }
  };

  return (
    <HeadsUpContext.Provider
      value={
        {
        wordData,
        saveWord,
        removeWord,
        category,
        setCategory,
        clearWordData
      }}
    >
      {children}
    </HeadsUpContext.Provider>
  );
};

export { HeadsUpContext, HeadsUpProvider };