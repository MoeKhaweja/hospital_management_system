import { useState, useEffect } from "react";
import { signInUser } from "../../utilities/fetch";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigateTo = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Perform sign-in logic here
  };
  const getUsers = async () => {
    if (submitted) {
      const response = await signInUser(email, password);
      switch (response.userType) {
        case "Admin":
          navigateTo("/admin");
          break;
        case "Doctor":
          navigateTo("/doctor");
          break;
        case "Patient":
          navigateTo("/patient");
          break;
        default:
          console.log("error");
          break;
      }
    }
  };
  useEffect(() => {
    getUsers();
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
