export default {
  injectScript: function (path: string) {
    // inject script
    console.log("injecting script", path);
    var s = document.createElement("script");
    s.src = chrome.runtime.getURL(path);
    // s.onload = function () {
    //   this.remove()
    // };
    (document.head || document.documentElement).appendChild(s);
  },
  sendToContent: async function (message: ChromeMessage) {
    let activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (activeTab[0]?.id) {
      let tabId = activeTab[0].id;
      await chrome.tabs.sendMessage(tabId, message);
    }
    // console.log('send to content', message);
    return;
  },
};
