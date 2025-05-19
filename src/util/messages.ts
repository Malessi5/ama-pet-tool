export default {
  sendToActiveTab: async function (data: any) {
    let activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    let tabId = activeTab[0].id!;
    await chrome.tabs.sendMessage(tabId, {
      data,
    });
  },
};
