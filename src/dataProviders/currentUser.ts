import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { working } from "../data/working";

export function useCurrentUser(): User | null | working {
  const [user, setUser] = useState<User | null | working>(working);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (newUser) => setUser(newUser));
  }, []);

  return user;
}
