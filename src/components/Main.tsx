import React from "react";
import Pets from "./Pets/PetsMain";
import Header from "./Header";

export default () => {
  return (
    <div className="container">
      <Header />
      <Pets />
    </div>
  );
};
