export default {
  sendToActiveTab: async function (data: ChromeMessage) {
    let activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (activeTab[0]?.id) {
      let tabId = activeTab[0].id;
      await chrome.tabs.sendMessage(tabId, {
        ...data,
      });
    }
  },
};
