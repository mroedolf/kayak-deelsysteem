import { User } from 'firebase/auth';
import create, { GetState, SetState } from 'zustand';
import { devtools, persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilterOptions } from '../types';
import mockKayakData from '../data/mockKayakData';

type UserSlice = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	removeUser: () => void;
};

type HomeSlice = {
	selectedFilter: FilterOptions;
	setSelectedFilter: (filter: string) => void;
	filterKayaks: (kayaks: typeof mockKayakData) => typeof mockKayakData;
	selectedDate: Date;
	setSelectedDate: (date: Date) => void;
};

type StoreState = UserSlice & HomeSlice;

type StoreSlice<T> = (
	set: SetState<StoreState>,
	get: GetState<StoreState>
) => T;

const createUserSlice: StoreSlice<UserSlice> = (set, get) => ({
	user: undefined,
	setUser: (user) => set({ user }),
	removeUser: () => set({ user: undefined }),
});

const createHomeSlice: StoreSlice<HomeSlice> = (set, get) => ({
	kayaks: mockKayakData,
	selectedFilter: 'Alles' as FilterOptions,
	setSelectedFilter: (filter) =>
		set({ selectedFilter: filter as FilterOptions }),
	filterKayaks: (kayaks) => {
		const { selectedFilter } = get();

		return selectedFilter === 'Alles'
			? kayaks
			: kayaks.filter((kayak) => kayak.type === selectedFilter);
	},
	selectedDate: new Date(),
	setSelectedDate: (date) => set({ selectedDate: date }),
});

export const useStore = create<StoreState>(
	persist<StoreState>(
		(set, get) => ({
			...createUserSlice(set, get),
			...createHomeSlice(set, get),
		}),
		{
			name: 'store',
			getStorage: () => AsyncStorage as StateStorage,
		}
	)
);
