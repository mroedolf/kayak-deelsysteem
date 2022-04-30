import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
	Poppins_700Bold,
	Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

export default function App() {
	const colorScheme = useColorScheme();
	const client = new QueryClient();
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
		Poppins_700Bold,
		Poppins_800ExtraBold,
	});

	if (!fontsLoaded) return <AppLoading />;

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
