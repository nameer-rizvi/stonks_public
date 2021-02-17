import scrapefrom from "scrapefrom";
import wsb from "./config.wsb";

export const stonkScraper = (query) =>
  new Promise((resolve, reject) =>
    scrapefrom(wsb(query))
      .then(resolve)
      .catch(reject)
  );
