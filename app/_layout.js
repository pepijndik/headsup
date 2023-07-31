import {NativeBaseProvider} from 'native-base';
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import * as Localization from "expo-localization";
import { en, nl } from "../src/lang";
import { Stack,Slot } from 'expo-router';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';
import { HeadsUpProvider } from '@/context/HeadsUp';
i18next.use(initReactI18next).init({
	compatibilityJSON: "v3",
	fallbackLng: Localization.locale,
	resources: {
		en: {
			translation: en,
		},
		nl: {
			translation: nl,
		},
	},
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
});


export default function Layout() {
	return (
		<SafeAreaProvider>
			<NativeBaseProvider>
				<HeadsUpProvider>
					<Stack
						screenOptions={{
						headerStyle: {
							backgroundColor: '#f4511e',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
						}}
					>
						<Stack.Screen name="index" options={{title:'Home'}} />
						<Stack.Screen name="game/index" options={{title:"Game",headerShown:false}} />
						<Stack.Screen name="result/index" options={{title:"Result"}} />
					</Stack>
				</HeadsUpProvider>
			
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
  }