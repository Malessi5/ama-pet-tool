const ContentScript = {
  sparkie: {
    init: function () {
      // message listener to listen for new pet info
      chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          if (message.type == "SAVE_PET") {
            console.log("message", message);
            const petData = this.scrapePetData();
            console.log(petData);
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
        const result: any = {};
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
              const key = this.toCamelCase(labelEl.textContent.trim());
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

        const medStatusEl = container.querySelector(
          '[click.trigger*="scrollToAnchor"] p'
        );
        if (medStatusEl) {
          // TODO: medical status type
          const medicalStatus: any = [];
          medStatusEl.querySelectorAll("span").forEach((span) => {
            const spanText = span.textContent || "";
            const text = spanText.trim();
            if (text) medicalStatus.push(text.replace(/\s+/g, " "));
          });
          result.medicalStatus = medicalStatus;
        }

        return result;
      },
    },
    scrapePetData: function () {
      const basicInfoContainer = document.querySelector("#basic-info-content");
      const basicInfo = basicInfoContainer
        ? this.utils.extractTextPairs(basicInfoContainer)
        : {};

      basicInfo["sparkieURL"] = window.location.href;
      const summaryInfo = this.utils.extractSummaryInfo();

      return {
        ...summaryInfo,
        ...basicInfo,
      };
    },
  },
};
