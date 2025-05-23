import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactEventHandler,
} from "react";

export default (props: {
  allPets: AllPetData;
  selectedPetId: string;
  setSelectedPetId: Function;
}) => {
  const { allPets, setSelectedPetId, selectedPetId } = props;

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target && e.target.id === "pet-selector") {
      setSelectedPetId(e.target.value);
    }
  };

  return (
    <div className="container">
      <select
        className="form-select"
        aria-label="Pet Selector"
        id="pet-selector"
        value={selectedPetId}
        onChange={changeHandler}
      >
        <option selected value="">
          Please Select an Animal
        </option>
        {Object.keys(allPets).map((petId) => (
          <option value={petId}>{allPets[petId].name}</option>
        ))}
      </select>
    </div>
  );
};
