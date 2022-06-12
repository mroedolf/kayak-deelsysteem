/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'react-native-gesture-handler';
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
import { ThemeProvider } from 'styled-components/native';
import theme from './components/styles/theme';
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
import { LogBox } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

LogBox.ignoreAllLogs();

LocaleConfig.locales['nl_NL'] = {
	monthNames: [
		'januari',
		'februari',
		'maart',
		'april',
		'mei',
		'juni',
		'juli',
		'augustus',
		'september',
		'oktober',
		'november',
		'december',
	],
	monthNamesShort: [
		'jan',
		'feb',
		'maart',
		'apr',
		'mei',
		'juni',
		'juli',
		'aug',
		'sept',
		'okt',
		'nov',
		'dec',
	],
	dayNames: [
		'zondag',
		'maandag',
		'dinsdag',
		'woensdag',
		'donderdag',
		'vrijdag',
		'zaterdag',
	],
	dayNamesShort: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
	today: 'vandaag',
	dateFormat: 'dd/MM/yyyy',
	dateFormatItem: 'dd/MM/yyyy',
	firstDay: 1,
	weekend: [0, 6],
};

LocaleConfig.defaultLocale = 'nl_NL';

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
