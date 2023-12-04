import { useState } from "react";
import { getPatients } from "../../utilities/fetch";
import DisplayPatients from "../../components/display_patients";

function Doctor() {
  getPatients();

  return (
    <div>
      <DisplayPatients></DisplayPatients>
    </div>
  );
}

export default Doctor;
