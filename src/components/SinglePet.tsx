import React, { useState, useEffect } from "react";

export default (props: { pet: PetData }) => {
  const [petData, setPetData] = useState({});
  const { pet } = props;
  const imgUrlPrefix = "https://sparkie-app-public.s3.amazonaws.com/";

  const getImageUrl = () => {
    if (pet.photos.length > 0) {
      return imgUrlPrefix + pet.photos[0].smallThumbnailUrl;
    }
  };

  const visibleAttributes = new Set([
    "breed",
    "breed2",
    "characteristics",
    "coat",
    "color",
    "gender",
    "size",
  ]);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${pet.animalId}`}
          aria-controls={pet.animalId}
        >
          <img src={getImageUrl()} />
          {pet.name}
        </button>
      </h2>
      <div
        id={pet.animalId}
        className="accordion-collapse collapse"
        data-bs-parent="#allPetsAccordion"
      >
        <div className="accordion-body">
          <ul className="list-group">
            {Object.keys(pet).map((key) => (
              <li className="list-group-item">{key}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
