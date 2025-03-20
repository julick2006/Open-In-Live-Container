// ==UserScript==
// @name         Open Winston App Live Container
// @version      1.0.0
// @author       nathandaven
// @match        *://*.reddit.com/*
// @downloadURL  https://github.com/nathandaven/Open-In-Apollo-Live-Container/raw/525f547ed2cbca1d8edaeee8a9a8c52715521224/open-in-apollo-live-container.user.js
// @updateURL    https://github.com/nathandaven/Open-In-Apollo-Live-Container/raw/525f547ed2cbca1d8edaeee8a9a8c52715521224/open-in-apollo-live-container.user.js
// @homepage     https://github.com/nathandaven/Open-In-Apollo-Live-Container/tree/main
// ==/UserScript==

// need to encode the string to base64 for live container link to work
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function openInApollo() {
  const regexRedditIDs =
    /^(?:https?:\/\/)?(?:(?:www|amp|m|i)\.)?(?:(?:reddit\.com))\/r\/(\w+)(?:\/comments\/(\w+)(?:\/\w+\/(\w+)(?:\/?.*?[?&]context=(\d+))?)?)?/i;
  const match = window.location.href.match(regexRedditIDs);

  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/?feed=home"
  ) {
    window.location.href =
      `livecontainer://open-web-page?url=` + utf8_to_b64("winstonapp://");
    return;
  }

  if (window.location.pathname.includes("/search")) {
    return;
  }

  if (match) {
    const newRegex = /\/new.*/;
    const endsInNew = newRegex.test(window.location.pathname);

    if (endsInNew) {
      newPath = window.location.pathname.slice(0, -4);
      window.location.href =
        `livecontainer://open-web-page?url=` +
        utf8_to_b64(`winstonapp://${window.location.hostname}${newPath}`);
      return;
    }
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(
        `winstonapp:/${window.location.hostname}${window.location.pathname}`
      );
  }
}

openInApollo();