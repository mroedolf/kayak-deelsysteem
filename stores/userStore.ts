import { User } from 'firebase/auth';
import create from 'zustand';
import { devtools, persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
};

export const userStore = create(
	devtools(
		persist<UserStore>(
			(set) => ({
				user: undefined,
				setUser: (user) => set({ user }),
			}),
			{
				name: 'userStore',
				getStorage: () => AsyncStorage as StateStorage,
			}
		)
	)
);
