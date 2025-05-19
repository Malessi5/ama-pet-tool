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
};
