import axios from "axios";
import wsj from "./config.wsj";

export const pricePostScraper = ({ q: query }) =>
  new Promise((resolve, reject) => {
    try {
      query = JSON.parse(query);

      Promise.allSettled(query.map((q) => axios(wsj(q))))
        .then((responses) =>
          resolve(
            query.map((i, index) => ({
              ...i,
              data: responses[index].value && responses[index].value.data,
            }))
          )
        )
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
