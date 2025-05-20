import React, { useState, useEffect } from "react";
import SinglePet from "./SinglePet";

type PetMap = Record<string, PetData>;

export default () => {
  const [allPets, setAllPets] = useState<PetMap>({});

  useEffect(() => {
    // Get all pet data
    getAllPetData();
    addStorageListener(setAllPets, "pets");
  }, []);

  const getAllPetData = async () => {
    try {
      const { pets } = await chrome.storage.local.get("pets");
      if (pets) {
        console.log(pets);
        setAllPets(pets);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addStorageListener = async (callback: Function, key: string) => {
    await chrome.storage.onChanged.addListener((changes) => {
      if (changes.hasOwnProperty(key)) {
        callback(changes[key].newValue);
      }
    });
  };

  return (
    <div className="container">
      <div className="accordion accordion-flush" id="allPetsAccordion">
        {Object.values(allPets).map((pet: PetData, i) => (
          <SinglePet pet={pet} key={i} />
        ))}
      </div>
    </div>
  );
};
