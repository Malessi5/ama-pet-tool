import React, { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";

const visibleAttributes = new Set([
  "animalId",
  "breed",
  "breed2",
  "characteristics",
  "coat",
  "color",
  "color2",
  "dateOfBirth",
  "intake",
  "gender",
  "size",
]);

export default (props: { pet: PetData }) => {
  const [petData, setPetData] = useState({});
  const { pet } = props;
  const imgUrlPrefix = "https://sparkie-app-public.s3.amazonaws.com/";
  const sparkieLinkPrefix = "https://app.sparkie.io/app/animals/";

  const getImageUrl = () => {
    if (pet.photos && pet.photos.length > 0) {
      return imgUrlPrefix + pet.photos[0].mediumThumbnailUrl;
    }
  };

  useEffect(() => {
    setPetData(formatPetData(pet));
  }, [pet]);

  const formatPetData = (pet: PetData) => {
    const updatedData: any = {};
    for (let attr in pet) {
      if (visibleAttributes.has(attr)) {
        if (attr == "intake" && pet["intake"]["date"]) {
          updatedData["intakeDate"] = pet["intake"]["date"];
        } else {
          updatedData[attr] = pet[attr as keyof typeof pet];
        }
      }
    }
    return updatedData;
  };

  const openInSparkie = () => {
    window.open(sparkieLinkPrefix + pet["_id"]);
  };

  return (
    <div className="container">
      <div className="mt-5">
        <div
          className="d-flex align-items-center flex-column mb-3"
          id="pet-header"
        >
          <img className="rounded" src={getImageUrl()} />
          {pet.adoptedName ? (
            <h3 className="mb-0">
              {pet.name} nka {pet.adoptedName}
            </h3>
          ) : (
            <h3 className="mb-0">{pet.name}</h3>
          )}
          <button
            style={{ fontSize: ".8em" }}
            className="btn btn-link"
            onClick={openInSparkie}
          >
            View in Sparkie
          </button>
        </div>
        <BasicInfo pet={pet} />
      </div>
    </div>
  );
};
