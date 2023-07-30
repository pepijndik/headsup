import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import {en,nl} from '../src/lang';
import { router } from 'expo-router';
i18next
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: Localization.locale,
    resources: {
      en:{
        translation: en
      },
      nl:{
        translation: nl
      }
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

/**
 * Home screen
 * Showing all posible categories
 * @returns React.FC
 */
export const Page = () => {
    const startGame = () => {
      router.replace('Game');
      };
    return (
        <SafeAreaView>
             <View style={styles.container}>
                <Text style={styles.title}>HeadsUp Game</Text>
                <TouchableOpacity onPress={startGame} style={styles.button}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
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
  