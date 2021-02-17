import { api, pricePostScraper, pricePostProcessor } from "../../lib";
import { isObjectValid } from "simpul";

export default (req, res) =>
  req.method === "GET"
    ? isObjectValid(req.query)
      ? pricePostScraper(req.query)
          .then(pricePostProcessor)
          .then((result) => res.status(200).send(result))
          .catch((error) => {
            console.error(error.toString());
            res.status(500).send(error);
          })
      : res.status(400).send("No stonks requested.")
    : res.status(405).send();
