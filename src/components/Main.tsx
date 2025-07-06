import React from "react";
import Pets from "./Pets/PetsMain";
import Header from "./Header";

export default (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <Pets />
    </div>
  );
};
