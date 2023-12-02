import { useState, useEffect } from "react";
import { signInUser } from "../../utilities/fetch";
import "./index.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Perform sign-in logic here
  };
  useEffect(() => {
    if (submitted) {
      signInUser(email, password);
    }
  }, [submitted]);

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
