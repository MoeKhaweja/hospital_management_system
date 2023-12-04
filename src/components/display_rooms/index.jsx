import { useState, useEffect } from "react";
import {
  getAdminRooms,
  deleteAdminRooms,
  updateRoomName,
  deleteFreeRoom,
} from "../../utilities/fetch";
import "./index.css";
// import { useDispatch } from "react-redux";
// import { roomActions } from "../../store/rooms_slice";

const DisplayRooms = ({ status, reload }) => {
  const [roomName, setRoomName] = useState("");
  const [editableRowId, setEditableRowId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [saveRooms, setSaveRooms] = useState(null);
  const [rerenderCount, setRerenderCount] = useState(0);

  // const dispatch = useDispatch();

  useEffect(() => {
    if (saveRooms) {
      updateRoomName(saveRooms.roomId, saveRooms.roomName);
      setRerenderCount((prevCount) => prevCount + 1);
      console.log("room save");
    }
  }, [saveRooms]);

  useEffect(() => {
    fetchRooms();
    console.log("refetch");
  }, [rerenderCount]);

  const fetchRooms = async () => {
    const r = await getAdminRooms(status);
    setRooms(r);
  };

  const handleEdit = (room) => {
    setRoomName(room.room_name);
    setEditableRowId(room.room_id);
  };

  const handleSave = async (roomId) => {
    setSaveRooms({ roomId: roomId, roomName: roomName });
    setEditableRowId(null);
  };

  const handleFreeUp = async (roomId) => {
    await deleteAdminRooms(roomId);
    setRerenderCount((prevCount) => prevCount + 1);
    console.log("room free");
    // dispatch(roomActions.reloadRooms());
    reload();
  };
  const handleDelete = async (roomId) => {
    await deleteFreeRoom(roomId);
    setRerenderCount((prevCount) => prevCount + 1);
    console.log("room delete");
    // dispatch(roomActions.reloadRooms());
    reload();
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
                  name="room_name"
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
