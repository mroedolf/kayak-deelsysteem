/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useStore } from '../stores/useStore';
import { RootStackParamList, RootTabParamList } from '../types';

type AccountLinks = {
	label: string;
	screen?: keyof RootTabParamList | keyof RootStackParamList;
	onPress?: () => void;
}[];

const { setState } = useStore;

const accountLinks: AccountLinks = [
	{
		label: 'Vind je kajak',
		screen: 'Homescreen',
	},
	{
		label: 'Mijn reservaties',
		screen: 'Reservations',
	},
	{
		label: 'Lidmaatschap beginnen',
		screen: 'SubscriptionWarning',
	},
	{
		label: 'Contact',
		screen: 'Contact',
	},
	{
		label: 'Log uit',
		onPress: () => {
			setState({
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				user: {},
			});
		},
	},
];

export { accountLinks };
