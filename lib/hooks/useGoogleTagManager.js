import { useEffect } from "react";
import { google } from "../constants";

export const useGoogleTagManager = () =>
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      !window.dataLayer && (window.dataLayer = []);

      google.tagManager.params.forEach((param) =>
        window.dataLayer.push(param.name, param.value)
      );
    }
  }, []);
