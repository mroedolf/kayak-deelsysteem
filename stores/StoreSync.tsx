import { collection } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import { Profile } from '../types';
import { useStore } from './useStore';
import { useCollection } from 'react-firebase-hooks/firestore';

/**
 * FIXME: This looks and feels like an incredibely bad idea.
 * Attempts to keep the user's profile in sync with the database.
 * This is needed because of subscription information being changed server side using Stripe webhooks.
 */
const StoreSync = () => {
	const { user, setProfile, profile } = useStore();

	const [value] = useCollection(collection(firestore, 'users'), {
		snapshotListenOptions: {
			includeMetadataChanges: true,
		},
	});

	if (!user) return null;

	const users = value?.docs?.map((doc) => doc.data()) as Profile[];

	const foundUser = users?.find((u) => u.userId === user.uid) as Profile;

	if (foundUser) {
		if (JSON.stringify(profile) !== JSON.stringify(foundUser)) {
			setProfile(foundUser);
		}
	}

	return null;
};

export default StoreSync;
