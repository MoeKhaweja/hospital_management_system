import { useState } from "react";
import { addAdminRoom } from "../../utilities/fetch";
import DisplayRooms from "../display_rooms";
import "./index.css";
// import { useSelector } from "react-redux";

const AddRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomsUpdated, setRoomsUpdated] = useState(0); // State to trigger rerender
  // const roomReload = useSelector((state) => state.rooms.reload);

  const reloadParent = () => {
    // console.log(roomReload);
    setRoomsUpdated(roomsUpdated + 1); // Trigger component rerender
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomName != "") {
      await addAdminRoom(roomName, "Free");
      setRoomName(""); // Reset input fields
      setRoomsUpdated(roomsUpdated + 1); // Trigger component rerender
    }
  };

  return (
    <div>
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomID">Room Name:</label>
          <input
            type="text"
            id="roomID"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <button type="submit">Add Room</button>
      </form>
      <div className="rooms">
        <DisplayRooms
          key={`Free-${roomsUpdated}`}
          status={"Free"}
          reload={reloadParent}
        />
        <DisplayRooms
          key={`Used-${roomsUpdated}`}
          status={"Used"}
          reload={reloadParent}
        />
      </div>
    </div>
  );
};

export default AddRoom;
