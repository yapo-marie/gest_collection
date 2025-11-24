import { signInWithPopup, signOut } from 'firebase/auth';

import { auth, googleProvider } from '../firebase/index.js';

export const loginWithGooglePopup = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  return { idToken, user: result.user };
};

export const logoutFirebase = () => signOut(auth);
