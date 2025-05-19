// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  switch (message.type) {
    case "SW_STORE_PET_DATA":
      PetStorage.add(message.petData);
      break;
    default:
      break;
  }
});

const PetStorage = {
  add: async function (petData: PetData) {
    try {
      const allPets = await this.getAllPets();
      console.log(petData, allPets);
      allPets[petData.animalId] = petData;
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
