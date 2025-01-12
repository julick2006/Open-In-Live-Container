// ==UserScript==
// @name         Open Apollo App Live Container
// @version      1.0.3-alt
// @author       nathandaven
// @match        *://*.reddit.com/*
// @downloadURL  https://gist.github.com/AnthonyGress/c04327abc6ff3bc45871468743f00341/raw/open-in-apollo-live-container.user.js
// @updateURL    https://gist.github.com/AnthonyGress/c04327abc6ff3bc45871468743f00341/raw/open-in-apollo-live-container.user.js
// @homepage     https://github.com/AnthonyGress/Open-In-Apollo/edit/main/open-in-apollo-live-container.user.js
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
      `livecontainer://open-web-page?url=` + utf8_to_b64("apollo://");
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
        utf8_to_b64(`apollo://${window.location.hostname}${newPath}`);
      return;
    }
    window.location.href =
      `livecontainer://open-web-page?url=` +
      utf8_to_b64(
        `apollo://${window.location.hostname}${window.location.pathname}`
      );
  }
}

openInApollo();
