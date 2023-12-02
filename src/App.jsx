import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/admin";
import Doctor from "./pages/doctor";
import Patient from "./pages/patient";
import ToggleSignUp from "./components/toggle_sign_up";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ToggleSignUp />
              </>
            }
          ></Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
