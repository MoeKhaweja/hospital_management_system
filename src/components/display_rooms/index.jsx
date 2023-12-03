import { useState, useEffect } from "react";
import {
  getAdminRooms,
  deleteAdminRooms,
  updateRoomName,
  deleteFreeRoom,
} from "../../utilities/fetch";
import "./index.css";

const DisplayRooms = ({ status }) => {
  const [roomName, setRoomName] = useState("");
  const [editableRowId, setEditableRowId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [saveRooms, setSaveRooms] = useState(null);
  const [changeRooms, setChangeRooms] = useState(0);

  useEffect(() => {
    const fetchRooms = async () => {
      setRooms(await getAdminRooms(status));
      console.log(changeRooms);
    };
    fetchRooms();
  }, [changeRooms, status]);

  useEffect(() => {
    if (saveRooms) {
      updateRoomName(saveRooms.roomId, saveRooms.roomName);
    }
  }, [saveRooms]);

  const handleEdit = (room) => {
    setRoomName(room.room_name);
    setEditableRowId(room.room_id);
  };

  const handleSave = async (roomId) => {
    setSaveRooms({ roomId: roomId, roomName: roomName });
    setEditableRowId(null);
    setChangeRooms(changeRooms + 1);
  };

  const handleFreeUp = async (roomId) => {
    await deleteAdminRooms(roomId);
    setChangeRooms(changeRooms + 1); // Fetch rooms again to update the list
  };
  const handleDelete = async (roomId) => {
    await deleteFreeRoom(roomId);
    setChangeRooms(changeRooms + 1); // Fetch rooms again to update the list
  };

  return (
    <table className="room-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.room_id}>
            <td>{room.room_id}</td>
            <td>
              {editableRowId === room.room_id ? (
                <input
                  type="text"
                  defaultValue={room.room_name}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              ) : (
                room.room_name
              )}
            </td>
            <td>{room.room_status}</td>
            <td>
              {editableRowId === room.room_id ? (
                <div className="flex">
                  <button onClick={() => handleSave(room.room_id)}>Save</button>
                  <button onClick={() => setEditableRowId(null)}>Cancel</button>
                </div>
              ) : (
                <div className="flex">
                  <button onClick={() => handleEdit(room)}>Edit</button>
                  {status == "Used" ? (
                    <button onClick={() => handleFreeUp(room.room_id)}>
                      Free
                    </button>
                  ) : (
                    <button onClick={() => handleDelete(room.room_id)}>
                      Delete
                    </button>
                  )}
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayRooms;
