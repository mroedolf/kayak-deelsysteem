import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './config/firebase';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
	const colorScheme = useColorScheme();

	return (
		<SafeAreaProvider>
			<Navigation colorScheme={colorScheme} />
			<StatusBar />
		</SafeAreaProvider>
	);
}
