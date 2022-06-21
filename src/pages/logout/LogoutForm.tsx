import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import { toError } from "../../domains/errors/errors";
import { ErrorMessage } from "../../ui/util/ErrorMessage";

export interface LogoutFormProps {
  onLoggedOut?: () => void;
}

export function LogoutForm({ onLoggedOut }: LogoutFormProps): JSX.Element {
  const [logoutError, setLogoutError] = useState<Error | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const onLogInClick = async () => {
    try {
      setLoggingOut(true);

      const auth = getAuth();
      await signOut(auth);
      onLoggedOut?.();
    } catch (error) {
      setLogoutError(toError(error));
      setLoggingOut(false);
    }
  };

  return (
    <div className="LogoutForm">
      {logoutError && <ErrorMessage error={logoutError} />}
      <button disabled={loggingOut} onClick={onLogInClick}>Log out</button>
    </div>
  );
}
