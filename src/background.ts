// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "SW_STORE_PET_DATA":
      PetStorage.addSinglePet(message.petData);
      break;
    case "SW_STORE_PETS_DATA":
      PetStorage.addMultiplePets(message.petData);
      break;
    case "CHECK_RESCUE_LINK":
      checkRescueLink(message.url, message.petId, sendResponse);
      break;
    default:
      break;
  }
  return true;
});

const checkRescueLink = async (
  url: string,
  petId: string,
  sendResponse: Function
) => {
  try {
    const check = await fetch(url, {
      method: "HEAD",
    });
    if (check.ok) {
      PetStorage.updateRescueURL(petId, url);
    }
    sendResponse(check.ok);
  } catch (error) {
    sendResponse(false);
  }
  // the link to an animals AMA page should follow the same format each time,
  // but we'll check if it's a valid link first before adding it
};

const PetStorage = {
  addSinglePet: async function (petData: PetData) {
    try {
      const allPets = await this.getAllPets();
      console.log(petData, allPets);

      if (petData.intake.date) {
        petData.intakeDate = new Date(petData.intake.date).toLocaleDateString();
      }

      if (petData.microchip.company) {
        petData.microchipCompany = petData.microchip.company;
      }

      if (petData.microchip.number) {
        petData.microchipNumber = petData.microchip.number;
      }

      allPets[petData.animalId] = petData;
      await chrome.storage.local.set({ pets: allPets });
    } catch (error) {
      console.error(error);
    }
  },
  updateRescueURL: async function (petId: string, url: string) {
    try {
      const allPets = await this.getAllPets();

      if (allPets.petId) {
        allPets.petId.rescueLink = url;
        allPets.petId.rescueLinkExpirationDate = new Date();
      }

      await chrome.storage.local.set({ pets: allPets });
    } catch (error) {
      console.error(error);
    }
  },
  addMultiplePets: async function (petData: PetData[]) {
    try {
      const allPets = await this.getAllPets();

      for (let pet of petData) {
        let id = pet.animalId;

        if (pet.intake.date) {
          pet.intakeDate = new Date(pet.intake.date).toLocaleDateString();
        }

        // if we don't have the pet data, we add it
        if (!allPets[id]) {
          allPets[id] = pet;
        } else {
          // if we do have the pet data, we only update the incoming attributes, not the whole object
          for (let attr in pet) {
            allPets[id][attr] = pet[attr as keyof typeof pet];
          }
        }
      }
      console.log(petData, allPets);

      await chrome.storage.local.set({ pets: allPets });
    } catch (error) {
      console.error(error);
    }
  },
  getAllPets: async function () {
    try {
      const { pets } = await chrome.storage.local.get("pets");
      if (pets) {
        return pets;
      } else {
        return {};
      }
    } catch (error) {
      console.error("Cannot retrieve all pet data", error);
      return {};
    }
  },
};
