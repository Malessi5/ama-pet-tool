import React, { useState, useEffect } from "react";

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
      return imgUrlPrefix + pet.photos[0].smallThumbnailUrl;
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
    <div>
      <div>
        <img src={getImageUrl()} />
        <p>{pet.name}</p>
        <ul className="list-group">
          {Object.keys(petData).map((key) => (
            <li className="list-group-item">
              {key} : {petData[key as keyof typeof petData]}
            </li>
          ))}
        </ul>
      </div>
      <button type="button" onClick={openInSparkie}>
        View in Sparkie
      </button>
    </div>
  );
};
