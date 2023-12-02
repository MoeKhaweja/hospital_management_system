import { useState } from "react";
import SignUp from "../sign_up";
import SignIn from "../sign_in";

const ToggleSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <br />
      {isSignUp ? <SignUp /> : <SignIn />}
      <a href="#" onClick={handleToggle}>
        {isSignUp ? "Sign In, Instead" : "Sign Up, Instead"}
      </a>
    </>
  );
};

export default ToggleSignUp;
