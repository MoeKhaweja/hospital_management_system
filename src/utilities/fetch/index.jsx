import axios from "axios";

const API_URL = "http://localhost/hospital_management_system/backend";
let localToken = localStorage.getItem("token");

const fetchApi = async (url, method, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${url}`,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const signUpUser = async (
  email,
  password,
  userType,
  name,
  gender,
  phoneNumber
) =>
  fetchApi("sign_up/signup.php", "post", {
    email,
    password,
    userType,
    name,
    gender,
    phoneNumber,
  });

export const signInUser = async (email, password) => {
  const response = await fetchApi("sign_up/signin.php", "post", {
    email,
    password,
  });
  const token = response.data.token;
  localToken = token;
  localStorage.setItem("token", token);
  console.log(response.data);
  return response.data;
};

export const getUsers = async (userType) => {
  const response = await fetchApi("users/get_users.php", "post", {
    userType,
  });
  return response.data;
};

export const updateUser = async (id, email, gender, name, phoneNumber) => {
  const response = await fetchApi("users/update_user.php", "post", {
    id,
    email,
    gender,
    name,
    phoneNumber,
  });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await fetchApi("users/delete_user.php", "post", {
    id,
  });
  return response.data;
};

export const addAdminRoom = async (room_name, room_status) => {
  const response = await fetchApi("rooms/add_room.php", "post", {
    room_name,
    room_status,
  });
  return response.data;
};

export const getAdminRooms = async (room_status) => {
  const response = await fetchApi("rooms/get_rooms.php", "post", {
    room_status,
  });
  return response.data;
};

export const deleteAdminRooms = async (room_id) => {
  const response = await fetchApi("rooms/delete_room.php", "post", {
    room_id,
  });
  return response.data;
};

export const deleteFreeRoom = async (room_id) => {
  const response = await fetchApi("rooms/delete_free_room.php", "post", {
    room_id,
  });
  return response.data;
};

export const updatePatientRoom = async (room_number, patient_id) => {
  const response = await fetchApi("patients/update_room.php", "post", {
    room_number,
    patient_id,
  });
  return response.data;
};

export const updateRoomName = async (room_id, room_name) => {
  const response = await fetchApi("rooms/update_room_name.php", "post", {
    room_id,
    room_name,
  });
  return response.data;
};

export const getPatients = async () => {
  const response = await fetchApi("doctors/get_patients.php", "get");
  return response.data;
};

export const prescribeMedication = async (patient_id, diagnosis) => {
  const response = await fetchApi("doctors/assign_medications.php", "post", {
    patient_id,
    diagnosis,
  });
  return response.data;
};

export const assignToPatient = async (patient_id, assigned_dr) => {
  const response = await fetchApi("doctors/assign_to_patient.php", "post", {
    patient_id,
    assigned_dr,
  });
  return response.data;
};

export const unAssignToPatient = async (patient_id) => {
  const response = await fetchApi("doctors/unassign_to_patient.php", "post", {
    patient_id,
  });
  return response.data;
};

export const addAppointment = async (
  doctor_id,
  appointment_date,
  appointment_start_time,
  appointment_end_time
) => {
  const response = await fetchApi("appointments/add_appointment.php", "post", {
    doctor_id,
    appointment_date,
    appointment_start_time,
    appointment_end_time,
  });
  return response.data;
};

export const getAppointments = async () => {
  const response = await fetchApi("appointments/get_appointments.php", "get");
  return response.data;
};

export const updateAppointment = async (id, appointment_status) => {
  const response = await fetchApi(
    "appointments/update_appointment.php",
    "post",
    {
      id,
      appointment_status,
    }
  );
  return response.data;
};

export const cancelAppointment = async (id, appointment_status) => {
  const response = await fetchApi(
    "appointments/cancel_appointment.php",
    "post",
    {
      id,
      appointment_status,
    }
  );
  return response.data;
};

export const requestAppointmentPatient = async (
  id,
  appointment_status,
  patient_id
) => {
  const response = await fetchApi(
    "appointments/request_appointment.php",
    "post",
    {
      id,
      appointment_status,
      patient_id,
    }
  );
  console.log(response);
  return response.data;
};

export const test = async () => {
  const response = await fetchApi("auth/jwt_decode.php", "post", {});
  console.log(response);
  return response.data;
};
