import { db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const saveUser = async (uid: string, data: any) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};

export const getUser = async (uid: string) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
};
