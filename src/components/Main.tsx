import React from "react";
import messages from "../util/messages";
import Pets from "./Pets";

export default () => {
  const savePet = () => {
    messages.sendToActiveTab({ type: "CONTENT_SAVE_PET" });
  };

  return (
    <div className="container">
      {/* <button type="button" className="btn btn-primary" onClick={savePet}>
        Save Pet
      </button> */}
      <Pets />
    </div>
  );
};
