import { signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { VStack } from "../../ui/util/VStack";

export interface FirebaseCheckProps {
}

export function FirebaseCheck(): JSX.Element {
  const user = useCurrentUser();

  const onLogInClick = async () => {
    const auth = getAuth();
    const email = "test@example.com";
    const password = "123456";
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log('# cred', cred);
  };

  const onLogOutClick = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <VStack>
      FirebaseCheck
      {user ? (
        <p>
          User: {user.email}
          <button onClick={onLogOutClick}>Log out</button>
        </p>
      ) : (
        <p>
          <button onClick={onLogInClick}>Log in</button>
        </p>
      )}
    </VStack>
  );
}

function useCurrentUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (newUser) => setUser(newUser));
  }, []);

  return user;
}
