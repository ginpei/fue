import styled from "styled-components";
import { useErrorLogger } from "../../domains/logs/logs";

export interface ErrorMessageProps {
  error: Error;
}

export function ErrorMessage({ error }: ErrorMessageProps): JSX.Element {
  useErrorLogger(error);

  return (
    <Root className="ErrorMessage">
      {error.message}
    </Root>
  );
}

const Root = styled.div`
  color: red;
`;
