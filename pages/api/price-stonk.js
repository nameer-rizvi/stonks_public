import { api, priceStonkScraper, priceStonkProcessor } from "../../lib";

export default (req, res) => {
  const stonks = req.query.stonks && req.query.stonks.split(",");
  req.method === "GET"
    ? stonks && stonks.length
      ? priceStonkScraper(stonks)
          .then(priceStonkProcessor)
          .then((result) => res.status(200).send(result))
          .catch((error) => {
            console.error(error.toString());
            res.status(500).send(error);
          })
      : res.status(400).send("No stonks requested.")
    : res.status(405).send();
};
