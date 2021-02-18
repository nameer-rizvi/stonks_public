import { google } from "../constants";

const trackEvent = (event) =>
  process.env.NODE_ENV !== "production" &&
  process.browser &&
  window &&
  window.dataLayer &&
  window.dataLayer.push(event);

const initialize = () => trackEvent(google.tagManager.dataLayerInit);

export const googleTagManager = { trackEvent, initialize };
