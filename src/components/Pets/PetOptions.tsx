import React, { ChangeEvent, useState, useEffect } from "react";

export default (props: {
  allPets: AllPetData;
  selectedPetId: string;
  setSelectedPetId: Function;
}) => {
  const { allPets, setSelectedPetId, selectedPetId } = props;
  const [petSelectArray, setPetSelectArray] = useState<PetData[]>([]);

  useEffect(() => {
    const sortedArray = Object.keys(allPets)
      .sort(
        (a, b) =>
          new Date(allPets[b].intakeDate).getTime() -
          new Date(allPets[a].intakeDate).getTime()
      )
      .map((petId) => allPets[petId]);

    setPetSelectArray(sortedArray);

    if (sortedArray.length && selectedPetId == "default") {
      setSelectedPetId(sortedArray[0].animalId);
    }
  }, [allPets]);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target && e.target.id === "pet-selector") {
      setSelectedPetId(e.target.value);
    }
  };

  const btnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const petIdArr = petSelectArray.map((pet) => pet.animalId);
    const target = e.target as HTMLButtonElement;
    let idx = petIdArr.indexOf(selectedPetId);
    console.log(target, idx);
    if (
      target?.id == "prev-btn" ||
      target?.parentElement?.id == "prev-btn" ||
      target?.parentElement?.parentElement?.id == "prev-btn"
    ) {
      if (idx > 0) {
        console.log(idx);
        setSelectedPetId(petIdArr[idx - 1]);
      }
    } else if (
      target?.id == "next-btn" ||
      target?.parentElement?.id == "next-btn" ||
      target?.parentElement?.parentElement?.id == "next-btn"
    ) {
      if (idx < petIdArr.length - 1) {
        setSelectedPetId(petIdArr[idx + 1]);
      }
    }
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center">
        <div>
          <button className="btn btn-link" onClick={btnHandler} id="prev-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#ff7940"
              className="bi bi-caret-left-fill"
              viewBox="0 0 16 16"
            >
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
        </div>
        <select
          className="form-select mt-2"
          aria-label="Pet Selector"
          id="pet-selector"
          value={selectedPetId}
          onChange={changeHandler}
        >
          <option selected value="default">
            Please Select an Animal
          </option>
          {petSelectArray.map((pet) =>
            pet.adoptedName && pet.adoptedName != pet.name ? (
              <option value={pet.animalId}>
                {pet.name} nka {pet.adoptedName}
              </option>
            ) : (
              <option value={pet.animalId}>{pet.name}</option>
            )
          )}
        </select>
        <div>
          <button className="btn btn-link" onClick={btnHandler} id="next-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#ff7940"
              className="bi bi-caret-right-fill"
              viewBox="0 0 16 16"
            >
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
