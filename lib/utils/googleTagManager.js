import { google } from "../constants";

function initialize() {
  if (process.env.NODE_ENV === "production" && window) {
    !window.dataLayer && (window.dataLayer = []);
    google.tagManager.params.forEach((param) =>
      window.dataLayer.push(param.name, param.value)
    );
  }
}

const trackEvent = (event) =>
  window && window.dataLayer && window.dataLayer.push(event);

export const googleTagManager = { initialize, trackEvent };
