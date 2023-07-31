import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter } from 'expo-router';
import useWords from "@/hooks/useWords";
/**
 * Home screen
 * Showing all posible categories
 * @returns React.FC
 */
export default function Page() {
	const router =useRouter();
	const {setCategory,addMultipleWords,clearWordData}=useWords();
	useEffect(() => {
		ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	}, []);
	const startGame = () => {
		clearWordData();
		addMultipleWords([
			"Harry Potter",
			"Star Wars",
			"Lord of the Rings",
			"Avengers",
			"Batman",
			"Spiderman",
		],"movies");
		setCategory("movies");
		router.push({
			pathname:"game",
			params:{
				category:"movies"
			}
		});
	};
	return (
		
			<View style={styles.container}>
				<Text style={styles.title}>HeadsUp Game</Text>
				<TouchableOpacity onPress={startGame} style={styles.button}>
					<Text style={styles.buttonText}>Start</Text>
				</TouchableOpacity>
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		alignItems: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#3498db",
	},
	button: {
		backgroundColor: "#3498db",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
	},
});
