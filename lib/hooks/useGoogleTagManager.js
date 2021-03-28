import { useEffect } from "react";
import { google } from "../constants";

export const useGoogleTagManager = () =>
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag("js", new Date());

    gtag("config", google.tagManager.id);
  }, []);
