import { stonkScraper, stonkProcessor } from "../../lib";

export default (req, res) =>
  req.method === "GET"
    ? stonkScraper(req.query)
        .then(stonkProcessor)
        .then((result) => res.status(200).send(result))
        .catch((error) => {
          console.error(error);
          res.status(500).send(error);
        })
    : res.status(405).send();
