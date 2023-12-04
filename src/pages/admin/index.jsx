import { useEffect, useState } from "react";
import { getUsers } from "../../utilities/fetch";
import DisplayUsers from "../../components/displayusers";
import "./index.css";
import AddRoom from "../../components/add_room";

function Admin() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("patients");

  const getAllUsers = async () => {
    const doctors = await getUsers("Doctor");
    const patients = await getUsers("Patient");
    setDoctors(doctors);
    setPatients(patients);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <AddRoom></AddRoom>

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
              usersType={"Patient"}
            ></DisplayUsers>
          ) : (
            <h3>No patients available</h3>
          ))}
        {activeTab === "doctors" &&
          (doctors.length > 0 ? (
            <DisplayUsers
              users={doctors}
              getAllUsers={getAllUsers}
              usersType={"Doctor"}
            ></DisplayUsers>
          ) : (
            <h3>No doctors available</h3>
          ))}

        {patients.length === 0 && doctors.length === 0 && (
          <p>No users available</p>
        )}
      </div>
    </>
  );
}

export default Admin;
