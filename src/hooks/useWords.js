// useWords.js
import { useContext } from 'react';
import { HeadsUpContext } from '@/context/HeadsUp';

const useWords = () => {
  const { wordData:savedWords, saveWord, removeWord,setCategory,category ,clearWordData} = useContext(HeadsUpContext);

  const addMultipleWords = (wordsToAdd, category) => {
    console.log("wordsToAdd",wordsToAdd);
    if (Array.isArray(wordsToAdd) && wordsToAdd.length > 0) {
      saveWord(category,wordsToAdd);
    }
  };
  const getWordsByCategory = (category) => {
    return savedWords[category] ?? [];
  };

  return { savedWords, addMultipleWords, removeWord,setCategory,category,getWordsByCategory,clearWordData};
};

export default useWords;