export const pricePostProcessor = (data) =>
  new Promise((resolve, reject) => {
    data.forEach((item, index) => {
      // Get prices at markers stored in ExtraData.
      const prices =
        item.data &&
        item.data.Series &&
        item.data.Series[0] &&
        item.data.Series[0].ExtraData;

      // Convert timestamp to unix.
      const timestamp = item.timestamp && new Date(item.timestamp).getTime();

      // Include difference between timestamp and price.Date.
      // Sort by smallest difference, with preference to "MostRecentLast".
      // Return top result.
      const closestPrice =
        prices &&
        prices
          .map((price, index) => ({
            ...price,
            diff: Math.abs(price.Date - timestamp),
          }))
          .sort((a, b) => {
            if (a.diff === b.diff && a.Name === "MostRecentLast") return 1;
            if (a.diff === b.diff && b.name === "MostRecentLast") return -1;
            return b.diff - a.diff;
          })
          .pop();

      // Add closestPrice to data
      data[index].price = closestPrice;

      // Remove data.data
      delete data[index].data;
    });

    resolve(data);
  });
