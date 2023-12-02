import { useEffect, useState } from "react";
import { signUpUser } from "../../utilities/fetch";
import "./index.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      signUpUser(email, password, userType, name, gender, phoneNumber);
    }
  }, [submitted]);

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="sign-up-form">
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
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Admin"
              checked={userType === "Admin"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              value="Doctor"
              checked={userType === "Doctor"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Doctor
          </label>
          <label>
            <input
              type="radio"
              value="Patient"
              checked={userType === "Patient"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Patient
          </label>
        </div>
        <button className="submit-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
