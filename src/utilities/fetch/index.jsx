import axios from "axios";

const API_URL = "http://localhost/hospital_management_system/backend";

// Function to sign up with username, password, and user role
export const signUpUser = async (
  email,
  password,
  userType,
  name,
  gender,
  phoneNumber
) => {
  try {
    const response = await axios.post(`${API_URL}/signup.php`, {
      email,
      password,
      userType,
      name,
      gender,
      phoneNumber,
    });
    console.log(response.data);
  } catch (error) {
    console.log("error");
    throw new Error(error.response.data.message);
  }
};

// Function to sign in with username and password
export const signInUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin.php`, {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
