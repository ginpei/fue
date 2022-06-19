import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export function useCurrentUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (newUser) => setUser(newUser));
  }, []);

  return user;
}
