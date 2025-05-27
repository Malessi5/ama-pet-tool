import React, { useState, useEffect } from "react";
import SinglePet from "./SinglePet/SinglePet";
import PetOptions from "./PetOptions";

type PetMap = Record<string, PetData>;

export default () => {
  const [allPets, setAllPets] = useState<PetMap>({});
  const [selectedPetId, setSelectedPetId] = useState<string>("default");
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);

  useEffect(() => {
    // Get all pet data
    getAllPetData();
    addStorageListener(setAllPets, "pets");
  }, []);

  useEffect(() => {
    if (selectedPetId !== "default") {
      setSelectedPet(allPets[selectedPetId]);
    }
  }, [selectedPetId, allPets]);

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
        console.log("storage change", changes[key].newValue);
        callback(changes[key].newValue);
      }
    });
  };

  return (
    <div className="container">
      {Object.keys(allPets).length > 0 ? (
        <>
          <PetOptions
            allPets={allPets}
            setSelectedPetId={setSelectedPetId}
            selectedPetId={selectedPetId}
          />
          {selectedPet != null && (
            <div>
              <SinglePet pet={selectedPet} />
            </div>
          )}
        </>
      ) : (
        <div>
          <p>No pet data found</p>
          <p>
            Visit <a href="https://app.sparkie.io/app/animals">Sparkie</a> to
            start populating pet data.
          </p>
        </div>
      )}
    </div>
  );
};
