import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
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
import { ThemeProvider } from 'styled-components/native';
import theme from './components/styles/theme';
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
import StoreSync from './stores/StoreSync';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

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
		<StripeProvider publishableKey="pk_test_51L8Op1Iyuahh3Vm7dfs6bvEyLHt72mn0KF3dRcru62xwYX1jKPipbGHPinersy8uENwkKtp3rgGzqwuTX8ZrYau600sbIx8I9K">
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={client}>
					<SafeAreaProvider>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
						<Toast />
						{/* <StoreSync /> */}
					</SafeAreaProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</StripeProvider>
	);
}
