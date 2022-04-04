import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import {useEffect, useState} from "react";

const auth = getAuth();

export const useAuthentication = () => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // User is signed out
                setUser(undefined);
            }
        });

        return () => {
            unsubscribeFromAuthStatusChanged();
        };
    }, []);

    return user;
};