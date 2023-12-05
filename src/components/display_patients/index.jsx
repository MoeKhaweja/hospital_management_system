import { useEffect, useState } from "react";
import {
  assignToPatient,
  getPatients,
  prescribeMedication,
  unAssignToPatient,
} from "../../utilities/fetch";
import "./index.css";

function DisplayPatients() {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const [editableRowId, setEditableRowId] = useState(null);
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [datachanged, setDatachanged] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      const data = await getPatients();
      setPatients(data);
    }
    fetchData();
  }, [datachanged]);

  const handleAssignSelf = async (patientId) => {
    await assignToPatient(patientId, userId);
    setDatachanged(datachanged + 1);
  };
  const handleUnAssignSelf = async (patientId) => {
    await unAssignToPatient(patientId);
    setDatachanged(datachanged + 1);
  };

  const handlePrescribeMedication = async () => {
    await prescribeMedication(editableRowId, diagnosis);
    setShowModal(!showModal);
    setDatachanged(datachanged + 1);
  };

  const handleToggleModal = (id = null) => {
    setEditableRowId(id);
    setShowModal(!showModal);
    setDatachanged(datachanged + 1);
  };

  const handleToggleMedicalRecords = (patient) => {
    setSelectedPatient(patient);
    setShowMedicalRecords(!showMedicalRecords);
    setDatachanged(datachanged + 1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Room Number</th>
            <th>Assigned Doctor</th>
            <th>Medications</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_id}</td>
              <td>{patient.room_number}</td>
              <td>{patient.assigned_dr}</td>
              <td>
                {patient.medications ? (
                  <>
                    {patient.medications.length > 0 && (
                      <button
                        onClick={() => handleToggleMedicalRecords(patient)}
                      >
                        Display Medical Records
                      </button>
                    )}
                  </>
                ) : (
                  "No medications"
                )}
              </td>
              <td>
                {patient.assigned_dr ? (
                  <>
                    {patient.assigned_dr == userId ? (
                      <button
                        onClick={() => {
                          handleUnAssignSelf(patient.patient_id);
                        }}
                      >
                        Unassign Self
                      </button>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleAssignSelf(patient.patient_id);
                    }}
                  >
                    Assign Self
                  </button>
                )}
                <button onClick={() => handleToggleModal(patient.patient_id)}>
                  Add Medications
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Prescribe Medication</h2>
            <textarea
              rows="4"
              cols="50"
              onChange={(e) => setDiagnosis(e.target.value)}
            ></textarea>
            <button onClick={handlePrescribeMedication}>Add Medication</button>
            <button onClick={handleToggleModal}>Close</button>
          </div>
        </div>
      )}
      {showMedicalRecords && (
        <div className="modal">
          <div className="modal-content">
            <h2>Medical Records</h2>
            {selectedPatient.medications.map((medication) => (
              <div key={medication.medication_id}>
                <table>
                  <tbody>
                    <tr>
                      <td>Date:</td>
                      <td>{medication.date.substring(0, 10)}</td>

                      <td>Diagnosis:</td>
                      <td>{medication.diagnosis}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
            <button onClick={() => handleToggleMedicalRecords(selectedPatient)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayPatients;
