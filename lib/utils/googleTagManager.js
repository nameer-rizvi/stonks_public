import { windowExists, google } from "../constants";

function initialize() {
  if (windowExists) {
    !window.dataLayer && (window.dataLayer = []);
    google.tagManager.params.forEach((param) =>
      window.dataLayer.push(param.name, param.value)
    );
  }
}

const trackEvent = (event) =>
  windowExists && window.dataLayer && window.dataLayer.push(event);

export const googleTagManager = { initialize, trackEvent };
