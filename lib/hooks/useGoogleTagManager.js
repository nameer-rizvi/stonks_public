import { google } from "../constants";

export function useGoogleTagManager() {
  if (process.browser && process.env.NODE_ENV === "production") {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag("js", new Date());

    gtag("config", google.tagManager.id);
  }
}
