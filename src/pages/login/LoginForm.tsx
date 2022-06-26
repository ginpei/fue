import { getAuth, GithubAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { useState } from "react";
import { toError } from "../../domains/errors/errors";
import { ErrorMessage } from "../../ui/util/ErrorMessage";
import { TermsOfUse } from "./TermsOfUse";

export interface LoginFormProps {
  onLoggedIn?: (cred: UserCredential) => void;
}

export function LoginForm({ onLoggedIn }: LoginFormProps): JSX.Element {
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const onLogInClick = async () => {
    try {
      setLoggingIn(true);

      const auth = getAuth();

      const provider = new GithubAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      onLoggedIn?.(cred);
    } catch (error) {
      setLoginError(toError(error));
      setLoggingIn(false);
    }
  };

  return (
    <div className="LoginForm">
      <TermsOfUse>
        {loginError && <ErrorMessage error={loginError} />}
        <button disabled={loggingIn} onClick={onLogInClick}>Log in</button>
      </TermsOfUse>
    </div>
  );
}
