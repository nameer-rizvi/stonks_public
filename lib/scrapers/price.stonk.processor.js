export const priceStonkProcessor = ({ stonks, responses }) =>
  new Promise((resolve, reject) => {
    // Pull CurrentQuote.Last as price for each stonk.

    const parsedResponses = responses.map((response, index) => {
      const { Last: price } =
        (response &&
          response.Series &&
          response.Series[0] &&
          response.Series[0].CurrentQuote) ||
        {};

      return { stonk: stonks[index], price };
    });

    resolve(parsedResponses);
  });
