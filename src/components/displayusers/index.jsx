import { useEffect, useState } from "react";
import {
  deleteUser,
  getAdminRooms,
  updatePatientRoom,
  updateUser,
} from "../../utilities/fetch";

// eslint-disable-next-line react/prop-types
const DisplayUsers = ({ users, getAllUsers, usersType }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [phone, setPhone] = useState();
  const [roomNumber, setRoomNumber] = useState();
  const [rooms, setRooms] = useState([]);

  const [editableRowId, setEditableRowId] = useState(null);
  const handleEdit = (user, userId) => {
    setName(user.name);
    setEmail(user.email);
    setGender(user.gender);
    setPhone(user.phone);
    setEditableRowId(userId);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const r = await getAdminRooms("Free");
    setRooms(r);
  };

  const handleSave = async (userId) => {
    console.log(userId, name, email, gender, phone);
    setEditableRowId(null);
    await updateUser(userId, email, gender, name, phone);
    if (usersType == "Patient") {
      await updatePatientRoom(roomNumber, userId);
    }
    getAllUsers();
  };
  const handleDelete = async (userId) => {
    await deleteUser(userId);
    console.log(`Deleting user with ID: ${userId}`);
    getAllUsers();
  };

  return (
    <table>
      <thead>
        {usersType != "Patient" ? (
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        ) : (
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Room ID</th>
            <th>Actions</th>
          </tr>
        )}
      </thead>

      <tbody>
        {
          // eslint-disable-next-line react/prop-types
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editableRowId === user.id ? (
                  <input
                    type="text"
                    defaultValue={user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editableRowId === user.id ? (
                  <input
                    type="text"
                    defaultValue={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editableRowId === user.id ? (
                  <>
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender === "Male"} // Check if gender is 'Male'
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Female"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender === "Female"} // Check if gender is 'Female'
                      />
                      Female
                    </label>
                  </>
                ) : (
                  user.gender
                )}
              </td>
              <td>
                {editableRowId === user.id ? (
                  <input
                    type="text"
                    defaultValue={user.phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              {usersType != "Patient" ? (
                <></>
              ) : (
                <td>
                  {editableRowId === user.id ? (
                    <select
                      name="free_room"
                      onChange={(e) => setRoomNumber(e.target.value)}
                    >
                      {rooms.map((room) => (
                        <option key={room.room_id} value={room.room_id}>
                          {room.room_id}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.room_number
                  )}
                </td>
              )}
              <td>
                {editableRowId === user.id ? (
                  <>
                    <button onClick={() => handleSave(user.id)}>Save</button>
                    <button onClick={() => setEditableRowId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user, user.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default DisplayUsers;
