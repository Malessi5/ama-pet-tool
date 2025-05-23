// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.type) {
    case "SW_STORE_PET_DATA":
      PetStorage.addSinglePet(message.petData);
      break;
    case "SW_STORE_PETS_DATA":
      PetStorage.addMultiplePets(message.petData);
      break;
    default:
      break;
  }
});

const PetStorage = {
  addSinglePet: async function (petData: PetData) {
    try {
      const allPets = await this.getAllPets();
      console.log(petData, allPets);
      allPets[petData.animalId] = petData;
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
