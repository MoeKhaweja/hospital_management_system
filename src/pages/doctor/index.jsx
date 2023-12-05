import { useState } from "react";
import { getPatients } from "../../utilities/fetch";
import DisplayPatients from "../../components/display_patients";
import MyCalander from "../../components/calendar";
import AddAppointment from "../../components/add_appointment";

function Doctor() {
  const [activeTab, setActiveTab] = useState("addAppointment");

  getPatients();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange("addAppointment")}>
          Add Time Slot
        </button>
        <button onClick={() => handleTabChange("calendar")}>Calendar</button>
        <button onClick={() => handleTabChange("patients")}>Patients</button>
      </div>
      {activeTab === "addAppointment" && <AddAppointment />}
      {activeTab === "calendar" && <MyCalander user={"Doctor"} />}
      {activeTab === "patients" && <DisplayPatients />}
      <p>
        a doctor will add available time slots, adding a slot will create an
        appointment with available status on the calendar
      </p>
      <br />
      <p>
        on the calendar, doctor will be able to see every slot created by him or
        other doctors
      </p>
      <br />
      <p>
        if a doctor created a slot for an appointment he can cancel it, but
        other doctors can't
      </p>
      <p>a patient can request an appointment when its state is available</p>
      <p>
        a patient can cancel an appointment if he requested (its state is
        pending or booked)
      </p>
      <p>paients cant cancel each other's appointments</p>
      <br />
      <p>
        last tab for medical records a docor can assign himslf to a patient or
        unassign himself
      </p>
      <p>other doctors cant modify assignment</p>
    </div>
  );
}

export default Doctor;
