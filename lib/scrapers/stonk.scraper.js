import scrapefrom from "scrapefrom";
import subreddit from "./config.subreddit";

export const stonkScraper = (query) =>
  new Promise((resolve, reject) =>
    scrapefrom(subreddit(query))
      .then(resolve)
      .catch(reject)
  );
