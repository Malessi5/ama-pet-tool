import content_utils from "./util/content_utils";

const ContentWS = {
  init: function () {
    content_utils.injectScript("scripts/wordpress_fill.js");
    // listen for message, then fire a custom event to pass data to injected script
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      if (message.type == "AUTOFILL_PET_DETAILS") {
        this.dispatchCustomEvent(message.data, "AUTOFILL_PET_DETAILS");
      }
    });
  },
  dispatchCustomEvent: function (data: PetData, eventType: string) {
    const eventData = {
      detail: {
        data,
      },
    };
    document.dispatchEvent(new CustomEvent(eventType, eventData));
  },
};
ContentWS.init();
