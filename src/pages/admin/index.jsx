import { useEffect, useState } from "react";
import { getUsers } from "../../utilities/fetch";
import DisplayUsers from "../../components/displayusers";
import "./index.css";

function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [activeTab, setActiveTab] = useState("patients");

  const getAllUsers = async () => {
    const doctors = await getUsers("Doctor");
    const patients = await getUsers("Patient");
    console.log(doctors);
    console.log(patients);
    setDoctors(doctors);
    setPatients(patients);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  // CRUD operations for doctors
  const addDoctor = (doctor) => {
    /*...*/
  };
  const updateDoctor = (doctor) => {
    /*...*/
  };
  const deleteDoctor = (doctor) => {
    /*...*/
  };

  // CRUD operations for patients
  const addPatient = (patient) => {
    /*...*/
  };
  const updatePatient = (patient) => {
    /*...*/
  };
  const deletePatient = (patient) => {
    /*...*/
  };

  // Approve or deny new patients
  const approvePatient = (patient) => {
    /*...*/
  };
  const denyPatient = (patient) => {
    /*...*/
  };

  // Assign patients to free rooms
  const assignRoom = (patient, room) => {
    /*...*/
  };

  return (
    <div className="patients_table">
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("patients")}
          className={activeTab === "patients" ? "active" : ""}
        >
          Patients
        </button>
        <button
          onClick={() => setActiveTab("doctors")}
          className={activeTab === "doctors" ? "active" : ""}
        >
          Doctors
        </button>
      </div>
      {activeTab === "patients" &&
        (patients.length > 0 ? (
          <DisplayUsers
            users={patients}
            getAllUsers={getAllUsers}
          ></DisplayUsers>
        ) : (
          <h3>No patients available</h3>
        ))}
      {activeTab === "doctors" &&
        (doctors.length > 0 ? (
          <DisplayUsers
            users={doctors}
            getAllUsers={getAllUsers}
          ></DisplayUsers>
        ) : (
          <h3>No doctors available</h3>
        ))}

      {patients.length === 0 && doctors.length === 0 && (
        <p>No users available</p>
      )}
    </div>
  );
}

export default Admin;
