import { User } from 'firebase/auth';
import create, { GetState, SetState } from 'zustand';
import { devtools, persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckoutTimeOptions, FilterOptions, Kayak, Profile } from '../types';

type UserSlice = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	removeUser: () => void;
	profile: Profile | undefined;
	setProfile: (profile: Profile | undefined) => void;
};

type HomeSlice = {
	kayaks: Kayak[];
	setKayaks: (kayaks: Kayak[]) => void;
	selectedFilter: FilterOptions;
	setSelectedFilter: (filter: string) => void;
	filterKayaks: (kayaks: Kayak[]) => Kayak[];
};

type CheckoutSlice = {
	selectedDate: number;
	setSelectedDate: (timestamp: number) => void;
	selectedTime: CheckoutTimeOptions;
	setSelectedTime: (time: CheckoutTimeOptions) => void; // 0 -> before 12, 1 -> after 12
};

type StoreState = UserSlice & HomeSlice & CheckoutSlice;

type StoreSlice<T> = (
	set: SetState<StoreState>,
	get: GetState<StoreState>
) => T;

const createUserSlice: StoreSlice<UserSlice> = (set) => ({
	user: undefined,
	setUser: (user) => set({ user }),
	removeUser: () => set({ user: undefined }),
	profile: undefined,
	setProfile: (profile) => set({ profile }),
});

const createHomeSlice: StoreSlice<HomeSlice> = (set, get) => ({
	kayaks: [],
	setKayaks: (kayaks) => set({ kayaks }),
	selectedFilter: 'Alles' as FilterOptions,
	setSelectedFilter: (filter) =>
		set({ selectedFilter: filter as FilterOptions }),
	filterKayaks: (kayaks) => {
		const { selectedFilter } = get();

		return selectedFilter === 'Alles'
			? kayaks
			: kayaks.filter((kayak) => kayak.type === selectedFilter);
	},
});

const createCheckoutSlice: StoreSlice<CheckoutSlice> = (set, get) => ({
	selectedDate: +new Date(),
	setSelectedDate: (timestamp) => set({ selectedDate: timestamp }),
	selectedTime: CheckoutTimeOptions.Voormiddag,
	setSelectedTime: (time) => set({ selectedTime: time }),
});

export const useStore = create<StoreState>(
	devtools(
		persist<StoreState>(
			(set, get) => ({
				...createUserSlice(set, get),
				...createHomeSlice(set, get),
				...createCheckoutSlice(set, get),
			}),
			{
				name: 'store',
				getStorage: () => AsyncStorage as StateStorage,
			}
		)
	)
);
