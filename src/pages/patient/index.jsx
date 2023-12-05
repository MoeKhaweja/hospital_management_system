import { useState } from "react";
import DisplayPatientInfo from "../../components/display_personal_record";
import MyCalendar from "../../components/calendar";

function Patient() {
  const [activeTab, setActiveTab] = useState("patientInfo");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange("patientInfo")}>
          Patient Info
        </button>
        <button onClick={() => handleTabChange("calendar")}>Calendar</button>
      </div>
      {activeTab === "patientInfo" && <DisplayPatientInfo></DisplayPatientInfo>}
      {activeTab === "calendar" && <MyCalendar user={"Patient"}></MyCalendar>}
    </div>
  );
}
export default Patient;
