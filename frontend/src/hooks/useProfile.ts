import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export interface UserProfile {
  name: string;
  age: number;
  email: string;
  createdAt?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching profile:", err);
      setError(err.message);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateProfile = async (data: Partial<UserProfile>) => {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, data, { merge: true });
  };

  return { profile, loading, error, updateProfile };
};
