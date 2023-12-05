import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import {
  getAppointments,
  updateAppointment,
  cancelAppointment as cancelUserAppointment,
  requestAppointmentPatient,
} from "../../utilities/fetch";
// import "react-calendar/dist/Calendar.css";
import "./index.css";

// eslint-disable-next-line react/prop-types
function MyCalendar({ user }) {
  const [value, onChange] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const today = new Date();
  const [appointmentsData, setAppointmentsData] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchAppointments() {
      const data = await getAppointments();
      setAppointmentsData(data);
    }

    fetchAppointments();
  }, []);

  const tileContent = ({ date }) => {
    const dateString = formatDate(date);
    const appointmentsForDate = appointmentsData.filter(
      (appointment) => appointment.date === dateString
    );

    if (appointmentsForDate.length > 0) {
      return <p>{appointmentsForDate.length} Slots</p>;
    }
    return null;
  };

  const formatAppointmentTime = (start, end) => {
    const startTime = new Date(start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startTime} to ${endTime}`;
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleDateClick = (value) => {
    console.log(value);
    const dateString = formatDate(value);
    const appointmentsForDate = appointmentsData.filter(
      (appointment) => appointment.date === dateString
    );

    setSelectedAppointments(appointmentsForDate);
  };

  const approveAppointment = async (appointmentId) => {
    updateAppointment(appointmentId, "Booked");
  };

  const cancelAppointment = async (appointmentId) => {
    cancelUserAppointment(appointmentId, "Canceled");
  };

  const requestAppointment = async (appointmentId) => {
    requestAppointmentPatient(appointmentId, "Pending", userId);
  };

  const hasAppointments = (date) => {
    const dateString = formatDate(date);
    const appointmentsForDate = appointmentsData.filter(
      (appointment) => appointment.date === dateString
    );
    return appointmentsForDate.length > 0;
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        minDate={today}
        tileContent={tileContent}
        onClickDay={(value) => handleDateClick(value)}
        tileClassName={({ date }) =>
          hasAppointments(date) ? "has-appointments" : ""
        }
      />
      {selectedAppointments.length > 0 && (
        <div>
          <h3>Appointments for selected date:</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.date}</td>
                  <td>
                    {formatAppointmentTime(
                      appointment.time_start,
                      appointment.time_end
                    )}
                  </td>
                  <td>{appointment.status}</td>
                  <td>
                    {appointment.status === "Pending" &&
                      user === "Doctor" &&
                      appointment.doctor_id === userId && (
                        <>
                          <button
                            onClick={() => approveAppointment(appointment.id)}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => cancelAppointment(appointment.id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    {appointment.status === "Available" &&
                      user === "Patient" && (
                        <button
                          onClick={() => requestAppointment(appointment.id)}
                        >
                          Request
                        </button>
                      )}
                    {user === "Doctor" &&
                      appointment.status !== "Pending" &&
                      appointment.status !== "Canceled" &&
                      appointment.doctor_id === userId && (
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </button>
                      )}
                    {user === "Patient" &&
                      (appointment.status == "Pending" ||
                        appointment.status == "Booked") &&
                      appointment.patient_id === userId && (
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancel
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
