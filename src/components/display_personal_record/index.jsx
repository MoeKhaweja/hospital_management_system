import { useEffect, useState } from "react";
import { getPatients } from "../../utilities/fetch";
import "./index.css";

function DisplayPatientInfo() {
  const [patient, setPatient] = useState(null);
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);
  const patientId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      const data = await getPatients();
      const userPatient = data.find(
        (patient) => patient.patient_id == patientId
      );
      console.log(userPatient);
      setPatient(userPatient);
    }
    fetchData();
  }, [patientId]);

  const handleToggleMedicalRecords = () => {
    setShowMedicalRecords(!showMedicalRecords);
  };

  if (!patient) {
    return <div>No patient information found.</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Room Number</th>
            <th>Assigned Doctor</th>
            <th>Medications</th>
          </tr>
        </thead>
        <tbody>
          <tr key={patient.patient_id}>
            <td>{patient.patient_id}</td>
            <td>{patient.room_number}</td>
            <td>{patient.assigned_dr}</td>
            <td>
              {patient.medications ? (
                <>
                  {patient.medications.length > 0 && (
                    <button onClick={handleToggleMedicalRecords}>
                      Display Medical Records
                    </button>
                  )}
                </>
              ) : (
                "No medications"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {showMedicalRecords && (
        <div className="modal">
          <div className="modal-content">
            <h2>Medical Records</h2>
            {patient.medications.map((medication) => (
              <div key={medication.medication_id}>
                <table>
                  <thead>
                    <tr>
                      <td>Date:</td>
                      <td>{medication.date.substring(0, 10)}</td>

                      <td>Diagnosis:</td>
                      <td>{medication.diagnosis}</td>
                    </tr>
                  </thead>
                </table>
              </div>
            ))}
            <button onClick={handleToggleMedicalRecords}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayPatientInfo;
