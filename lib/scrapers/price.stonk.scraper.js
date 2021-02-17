import axios from "axios";
import wsj from "./config.wsj";

export const priceStonkScraper = (stonks) =>
  new Promise((resolve, reject) =>
    Promise.allSettled(stonks.map((stonk) => axios(wsj({ stonk }))))
      .then((responses) =>
        resolve({
          stonks,
          responses: responses.map(
            (response) => response.value && response.value.data
          ),
        })
      )
      .catch(reject)
  );
