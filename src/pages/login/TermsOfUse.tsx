import { useState } from "react";
import { NiceButton } from "../../ui/forms/NiceButton";
import { VStack } from "../../ui/util/VStack";

export interface TermsOfUseProps {
  children: React.ReactNode;
}

export function TermsOfUse({ children }: TermsOfUseProps): JSX.Element {
  const [understood, setUnderstood] = useState(false);

  const onClick = () => {
    setUnderstood(true);
  };

  return (
    <VStack>
      <h2>Terms of use</h2>
      <ol>
        <li>Under development</li>
        <li>You CANNOT use</li>
      </ol>
      <div>
        <NiceButton disabled={understood} onClick={onClick}>OK</NiceButton>
      </div>
      {understood && <div>{children}</div>}
    </VStack>
  );
}
