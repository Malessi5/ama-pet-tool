import content_utils from "./util/content_utils";

const ContentScript = {
  sparkie: {
    init: function () {
      console.log("sparkie init");
      //inject script to intercept pet data from API calls
      content_utils.injectScript("scripts/data_intercept.js");

      // custom event listener to listen for data from inject script
      document.addEventListener("DISPATCH_DATA", (e) => {
        const customEvent = e as CustomEvent<any>;
        console.log(customEvent.detail);
        ContentScript.sparkie.utils.savePetData(customEvent.detail);
      });

      // message listener to listen for new pet info
      chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          if (message.type == "CONTENT_SAVE_PET") {
            const petData = this.scrapePetData();
            console.log(petData);
            ContentScript.sparkie.utils.savePetData(petData);
          }
        }
      );
    },
    utils: {
      toCamelCase: function (str: string) {
        return str
          .replace(/\s(.)/g, (_, char) => char.toUpperCase())
          .replace(/[^a-zA-Z0-9]/g, "")
          .replace(/^(.)/, (_, char) => char.toLowerCase());
      },
      extractTextPairs: function (container: Element) {
        // TODO: PET/RESULT type
        const result = {} as PetData;
        const rows = container.querySelectorAll(".arp-details-row");

        rows.forEach((row) => {
          const columns = row.querySelectorAll("div.col-sm-6");

          columns.forEach((col) => {
            const labelEl = col.querySelector("strong");
            const valueEl = col.querySelector("p") || col.querySelector("div");

            if (
              labelEl &&
              valueEl &&
              labelEl.textContent &&
              valueEl.textContent
            ) {
              const key = this.toCamelCase(
                labelEl.textContent.trim()
              ) as keyof PetData;
              const value = valueEl.textContent.trim().replace(/\s+/g, " ");
              result[key] = value;
            }
          });
        });

        return result;
      },
      extractSummaryInfo: function () {
        const container = document.querySelector("#-content");
        if (!container) return {};
        // TODO: result/petdata type
        const result: any = {};

        const imgEl = container.querySelector("img");
        if (imgEl) result.imageUrl = imgEl.getAttribute("src");

        const nameEl = container.querySelector('[data-test-id="animal_name"]');
        if (nameEl && nameEl.textContent)
          result.name = nameEl.textContent.trim();

        const idEl = container.querySelector('[data-test-id="animal_id"]');
        if (idEl && idEl.textContent)
          result.id = idEl.textContent.trim().replace(/^ID:\s*/, "");

        const strongEls = container.querySelectorAll("strong");
        strongEls.forEach((strong) => {
          let key;

          if (strong.textContent) {
            key = this.toCamelCase(strong.textContent.trim());
          }
          const nextP = strong.nextElementSibling;
          if (
            nextP &&
            nextP.textContent &&
            nextP.tagName.toLowerCase() === "p" &&
            key
          ) {
            const value = nextP.textContent.trim().replace(/\s+/g, " ");
            result[key] = value;
          }
        });

        return result;
      },
      savePetData: async function (petData: PetData) {
        await chrome.runtime.sendMessage({
          type: "SW_STORE_PET_DATA",
          petData,
        });
      },
    },
    scrapePetData: function () {
      const basicInfoContainer = document.querySelector("#basic-info-content");
      const basicInfo = basicInfoContainer
        ? this.utils.extractTextPairs(basicInfoContainer)
        : ({} as PetData);

      basicInfo["sparkieURL"] = window.location.href;
      const summaryInfo = this.utils.extractSummaryInfo();

      return {
        ...summaryInfo,
        ...basicInfo,
      };
    },
  },
};
ContentScript.sparkie.init();
