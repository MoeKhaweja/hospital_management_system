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
    const token = response.data.token; // Get the token from the response
    // Store the token securely (e.g., in local storage)
    localStorage.setItem("token", token); // Store in local storage
    console.log(response.data);
    return token; // Return the token for further handling if needed
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
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUsers = async (userType) => {
  try {
    const response = await axios.post(`${API_URL}/get_users.php`, {
      userType,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateUser = async (id, email, gender, name, phoneNumber) => {
  try {
    const response = await axios.post(`${API_URL}/update_user.php`, {
      id,
      email,
      gender,
      name,
      phoneNumber,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/delete_user.php`, {
      id,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
