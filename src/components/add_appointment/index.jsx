import { useState } from "react";
import { addAppointment } from "../../utilities/fetch";
import "./index.css"; // Import the CSS file for styling

function AddAppointment() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const userId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the submission logic
    const newAppointment = {
      date,
      time_start: date + " " + startTime,
      time_end: date + " " + endTime,
    };
    // You can perform actions like sending this data to an API or handling it in the parent component
    console.log("New Appointment:", newAppointment);
    // Clear the form after submission
    addAppointment(
      userId,
      newAppointment.date,
      newAppointment.time_start,
      newAppointment.time_end
    );
    clearForm();
  };

  const clearForm = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="add-appointment-container">
      <h2>Add Time Slot</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="add-appointment-button">
          Add Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
