import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

import { Input, InputVariants } from "@namada/components";
import { InputFeedback } from "./Password.components";

// the data of this form
type PasswordProps = {
  onValidPassword: (password: string | undefined) => void;
};

const validatePassword = (
  { warning, suggestions }: zxcvbn.ZXCVBNFeedback,
  password: string,
  passwordMatch: string
): boolean => {
  return process.env.NODE_ENV === "development"
    ? password.length > 0 && password === passwordMatch
    : warning === "" && suggestions.length === 0 && password === passwordMatch;
};

const Password = ({ onValidPassword }: PasswordProps): JSX.Element => {
  // we store passwords locally as we would not like to pass them in
  // when the user switches between the screens
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [passwordMatchFeedback, setPasswordMatchFeedback] = useState("");
  const [zxcvbnFeedback, setZxcvbnFeedback] = useState(zxcvbn("").feedback);

  useEffect(() => {
    const isPasswordValid = validatePassword(
      zxcvbnFeedback,
      password,
      passwordMatch
    );

    if (isPasswordValid) {
      onValidPassword(password);
    } else {
      onValidPassword(undefined);
    }
  }, [password, passwordMatch, zxcvbnFeedback]);

  const verifyPasswordMatch = (toVerify: string): void => {
    if (passwordMatch !== "" && password !== toVerify) {
      setPasswordMatchFeedback("Passwords are not matching");
    } else {
      setPasswordMatchFeedback("");
    }
  };

  const checkPasswordErrors = (password: string): void => {
    const { feedback } = zxcvbn(password);
    setZxcvbnFeedback(feedback);
    verifyPasswordMatch(password);
  };

  const displayError = zxcvbnFeedback.warning
    ? zxcvbnFeedback.warning
    : zxcvbnFeedback.suggestions.length > 0 &&
      zxcvbnFeedback.suggestions.map((suggestion: string, index: number) => (
        <InputFeedback key={`input-feedback-${index}`}>
          {suggestion}
        </InputFeedback>
      ));

  return (
    <>
      <Input
        label="Create Extension Password"
        variant={InputVariants.Password}
        value={password}
        error={password.length > 0 ? displayError : ""}
        placeholder="At least 8 characters"
        onChange={(e) => {
          setPassword(e.target.value);
          checkPasswordErrors(e.target.value);
        }}
        onBlur={() => {
          checkPasswordErrors(password);
        }}
      />

      <Input
        label="Confirm Extension Password"
        placeholder="At least 8 characters"
        variant={InputVariants.Password}
        value={passwordMatch}
        error={passwordMatchFeedback}
        onChange={(event) => {
          setPasswordMatch(event.target.value);
          verifyPasswordMatch(event.target.value);
        }}
        onBlur={() => {
          verifyPasswordMatch(password);
        }}
      />
    </>
  );
};

export default Password;
