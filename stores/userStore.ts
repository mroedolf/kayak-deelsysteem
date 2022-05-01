import { User } from 'firebase/auth';
import create from 'zustand';
import { devtools, persist, StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
	user: User | undefined;
	setUser: (user: User | undefined) => void;
	removeUser: () => void;
};

export const userStore = create(
	devtools(
		persist<UserStore>(
			(set) => ({
				user: undefined,
				setUser: (user) => set({ user }),
				removeUser: () => set({ user: undefined }),
			}),
			{
				name: 'userStore',
				getStorage: () => AsyncStorage as StateStorage,
			}
		)
	)
);
