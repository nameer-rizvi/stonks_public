import { useEffect } from "react";
import { google } from "../constants";

export const useGoogleTagManager = () =>
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    google.tagManager.params.forEach((param) => gtag(param.name, param.value));

    const status = window.dataLayer && window.dataLayer.length ? "👍" : "👎";

    console.log("Google tag manager: " + status);
  }, []);
