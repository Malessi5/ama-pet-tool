import React from "react";
import messages from "../util/messages";

export default () => {
  const savePet = () => {
    messages.sendToActiveTab({ type: "SAVE_PET" });
  };

  return (
    <div className="container">
      <button onClick={savePet}>Save Pet</button>
    </div>
  );
};
