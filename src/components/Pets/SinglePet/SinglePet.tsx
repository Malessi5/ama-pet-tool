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
  // const [petData, setPetData] = useState({});
  const [amaLinkValid, setAmaLinkValid] = useState(false);
  const { pet } = props;
  const imgUrlPrefix = "https://sparkie-app-public.s3.amazonaws.com/";
  const sparkieLinkPrefix = "https://app.sparkie.io/app/animals/";

  const getImageUrl = () => {
    if (pet.photos && pet.photos.length > 0) {
      return imgUrlPrefix + pet.photos[0].mediumThumbnailUrl;
    }
  };

  useEffect(() => {
    checkAMALink();
  }, [pet]);
  // useEffect(() => {
  //   setPetData(formatPetData(pet));
  // }, [pet]);

  // const formatPetData = (pet: PetData) => {
  //   const updatedData: any = {};
  //   for (let attr in pet) {
  //     if (visibleAttributes.has(attr)) {
  //       if (attr == "intake" && pet["intake"]["date"]) {
  //         updatedData["intakeDate"] = pet["intake"]["date"];
  //       } else {
  //         updatedData[attr] = pet[attr as keyof typeof pet];
  //       }
  //     }
  //   }
  //   return updatedData;
  // };

  const openInSparkie = () => {
    window.open(sparkieLinkPrefix + pet["_id"]);
  };

  const openAMAPage = () => {
    window.open(`https://www.amaanimalrescue.org/pet/${pet.name}/`);
  };

  const checkAMALink = async () => {
    // the link to an animals AMA page should follow the same format each time,
    // but we'll check if it's a valid link first before adding it

    //TODO: save link and expiration date to pet data
    await chrome.runtime.sendMessage(
      {
        type: "CHECK_AMA_LINK",
        url: `https://amaanimalrescue.org/pet/${pet.name}/`,
      },
      (response) => {
        setAmaLinkValid(response);
      }
    );

    // setAmaLinkValid(status);
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
          <div className="flex">
            <button
              style={{ fontSize: ".8em" }}
              className="btn btn-link"
              onClick={openInSparkie}
            >
              View in Sparkie
            </button>
            {amaLinkValid && (
              <button
                style={{ fontSize: ".8em" }}
                className="btn btn-link"
                onClick={openAMAPage}
              >
                AMA Page
              </button>
            )}
          </div>
        </div>
        <BasicInfo pet={pet} />
      </div>
    </div>
  );
};
