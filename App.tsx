import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';

export default function App() {
	const colorScheme = useColorScheme();
	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
				<Toast />
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
