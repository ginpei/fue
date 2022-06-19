import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCurrentUser } from "../../dataProviders/currentUser";
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
