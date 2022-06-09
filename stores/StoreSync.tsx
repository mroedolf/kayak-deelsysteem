import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query as q, where } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { Profile } from '../types';
import { useStore } from './useStore';

/**
 * FIXME: This looks and feels like an incredibely bad idea.
 * Attempts to keep the user's profile in sync with the database.
 * This is needed because of subscription information being changed server side using Stripe webhooks.
 */
const StoreSync = () => {
	const { user, setProfile, profile } = useStore();
	const ref = q(
		collection(firestore, 'users'),
		where('email', '==', user?.email)
	);
	const query = useFirestoreQuery(['users'], ref, {
		subscribe: true,
	});

	const foundUser = query.data?.docs?.map((doc) => doc.data())[0];

	if (foundUser) {
		if (JSON.stringify(profile) !== JSON.stringify(foundUser)) {
			setProfile(foundUser as Profile);
		}
	}

	return null;
};

export default StoreSync;
