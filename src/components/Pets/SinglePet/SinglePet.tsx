import React, { useState, useEffect } from "react";
import BasicInfo from "./BasicInfo";
import content_utils from "../../../util/content_utils";

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

  const getImageUrl = () => {
    if (pet.photos && pet.photos.length > 0) {
      return process.env.SPARKIE_IMG_PREFIX + pet.photos[0].mediumThumbnailUrl;
    }
    return "./img/default.png";
  };

  useEffect(() => {
    // check rescue link validity and expiration date
    if (
      pet.rescueLink &&
      validDate(new Date(pet.rescueLinkExpirationDate), new Date())
    ) {
      setAmaLinkValid(true);
    } else {
      setAmaLinkValid(false);
      checkRescueLink();
    }
  }, [pet]);

  const validDate = (expDate: Date, currentDate: Date) => {
    // check if exp date is within 7 days
    let dateDiff = Math.floor(
      (expDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000)
    );

    return dateDiff <= 7;
  };

  const openInSparkie = () => {
    window.open(process.env.SPARKIE_LINK_PREFIX + pet["_id"]);
  };

  const openRescuePage = () => {
    window.open(`${process.env.RESCUE_POST_URL_PREFIX}${pet.name}/`);
  };

  const openNewPetPage = () => {
    window.open(`${process.env.RESCUE_NEW_POST_LINK}&post_title=${pet.name}`);

    setTimeout(() => {
      content_utils.sendToContent({ type: "AUTOFILL_PET_DETAILS", data: pet });
    }, 1000);
    // chrome.runtime.sendMessage({ type: "AUTOFILL_PET_DETAILS", data: pet });
  };

  const checkRescueLink = async () => {
    // the link to an animals AMA page should follow the same format each time,
    // but we'll check if it's a valid link first before adding it

    //TODO: save link and expiration date to pet data
    await chrome.runtime.sendMessage(
      {
        type: "CHECK_RESCUE_LINK",
        url: `${process.env.RESCUE_POST_URL_PREFIX}${pet.name}/`,
        petId: pet.animalId,
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
          <div style={{ height: 200 }}>
            <img
              className="rounded"
              src={getImageUrl()}
              style={{ width: 200 }}
            />
          </div>
          <div className="d-flex">
            <div id="pet-name">
              {pet.adoptedName ? (
                <h3 className="mb-0">
                  {pet.name} nka {pet.adoptedName}
                </h3>
              ) : (
                <h3 className="mb-0">{pet.name}</h3>
              )}
            </div>
          </div>
          <div className="flex" id="links">
            <button
              style={{ fontSize: ".8em" }}
              className="btn btn-link"
              onClick={openInSparkie}
            >
              View in Sparkie
            </button>
            {amaLinkValid ? (
              <button
                style={{ fontSize: ".8em" }}
                className="btn btn-link"
                onClick={openRescuePage}
              >
                AMA Page
              </button>
            ) : (
              <button
                style={{ fontSize: ".8em" }}
                className="btn btn-link"
                onClick={openNewPetPage}
              >
                Add to Website
              </button>
            )}
          </div>
        </div>
        <BasicInfo pet={pet} />
      </div>
    </div>
  );
};
