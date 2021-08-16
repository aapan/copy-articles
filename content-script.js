function copyTextToClipboard (text) {
  var copyFrom = document.createElement("textarea");

  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}

function find_articles (select_css, mod_url) {
  article_urls = "";
  articles = document.querySelectorAll(select_css);
  articles.forEach(element => {
    url = element.getAttribute("href")
    if (mod_url) {
      url = mod_url(url);
    }
    article_urls += url + '\n';
  });

  return article_urls;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'getText') {
    url = location.href
    if (url.includes("www.google.com/search")) {
      text = find_articles("g-card div.dbsr a");
    }
    else if (url.includes("mobile01.com/googlesearch")) {
      text = find_articles("div.gsc-result div.gsc-thumbnail-inside a.gs-title", (url) => {
        url = url.split("&p=")[0]
        return url;
      });
    }
    else if (url.includes("www.dcard.tw/f")) {
      text = find_articles("article h2 a", (url) => {
        url = "https://www.dcard.tw" + url
        return url;
      });
    }
    copyTextToClipboard(text);
  }
});
