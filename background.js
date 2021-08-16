chrome.contextMenus.create({
  type: "normal",
  id: "copyArticles",
  title: "複製所有文章連結",
  contexts: ["page"],
  documentUrlPatterns: [
    "https://*.google.com/search*",
    "https://*.mobile01.com/googlesearch*",
    "https://*.dcard.tw/f/*"
  ]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, {action: "getText", tabId: tab.id});
});

