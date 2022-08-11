/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
	Poppins_700Bold,
	Poppins_800ExtraBold,
	useFonts,
} from '@expo-google-fonts/poppins';
import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components/native';
import theme from './components/styles/theme';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import StoreSync from './stores/StoreSync';

const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Setting a timer']);
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

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';
console.log(stripePublishableKey);
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
		<StripeProvider publishableKey='pk_test_51LQEyXFuEXrAY8lh5APMd04f646oA7xbxbTgDEdmq152SDAA3CzSQjSdWmaqWCTioAFkClHKK8lhtJZYTtxY5VbF00B8WknyAv'>
			<ThemeProvider theme={theme}>
				<QueryClientProvider client={client}>
					<SafeAreaProvider>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
						<Toast />
						<StoreSync />
					</SafeAreaProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</StripeProvider>
	);
}
