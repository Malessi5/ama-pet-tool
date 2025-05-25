import content_utils from "./util/content_utils";

const ContentScript = {
  sparkie: {
    init: function () {
      console.log("sparkie init");
      //inject script to intercept pet data from API calls
      content_utils.injectScript("scripts/data_intercept.js");

      // custom event listener to listen for data from inject script
      document.addEventListener("DISPATCH_SINGLE_PET_DATA", (e) => {
        const customEvent = e as CustomEvent<any>;
        console.log(customEvent.detail);
        ContentScript.sparkie.utils.savePetData(customEvent.detail, true);
      });

      document.addEventListener("DISPATCH_MULTI_PET_DATA", (e) => {
        const customEvent = e as CustomEvent<any>;
        console.log(customEvent.detail);
        ContentScript.sparkie.utils.savePetData(customEvent.detail, false);
      });
    },
    utils: {
      savePetData: async function (petData: PetData, singlePet: Boolean) {
        if (singlePet) {
          await chrome.runtime.sendMessage({
            type: "SW_STORE_PET_DATA",
            petData,
          });
        } else {
          await chrome.runtime.sendMessage({
            type: "SW_STORE_PETS_DATA",
            petData,
          });
        }
      },
    },
  },
};
ContentScript.sparkie.init();
