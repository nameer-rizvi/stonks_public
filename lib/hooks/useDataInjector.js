import { useState, useEffect } from "react";
import useAsyncFetch from "async-fetch";
import { makeMinutes } from "../utils";
import { isNumber } from "simpul";
import TextCleaner from "text-cleaner";

export function useDataInjector({ initialStonks }) {
  // Initialize stonks state/setter.
  const [stonks, setStonks] = useState([]);

  // Update stonks everytime initialStonks updates. initialStonks is
  // the main list of stonks that gets fetched in /pages/index.js.
  useEffect(() => {
    setStonks(initialStonks);
  }, [initialStonks]);

  // Add price data for each stonk on stonkPriceFetcher success.
  const stonkPriceFetcherOnSuccess = (stonksWithPrices) =>
    setStonks((currStonks) =>
      currStonks.map((currStonk) => ({
        ...currStonk,
        ...stonksWithPrices.find((i) => i.stonk === currStonk.stonk),
      }))
    );

  // Fetch price for each stonk when initialStonks updates.
  // Poll for new data every 5 minutes.
  // Disable fetch's Abort Controller.
  // Updates stonks on success.
  const stonkPriceFetcher = useAsyncFetch({
    useEffectDependency: [initialStonks],
    url: "/api/price-stonk",
    query: { stonks: initialStonks.map((initialStonk) => initialStonk.stonk) },
    poll: makeMinutes(5),
    disableController: true,
    onSuccess: stonkPriceFetcherOnSuccess,
  });

  // Query price for stonk posts by timestamps.
  const postPriceQuery = initialStonks.reduce(
    (reducer, stonk) =>
      reducer.concat(
        stonk.posts.map((post) => ({
          timestamp: post.timestamp,
          stonk: stonk.stonk,
        }))
      ),
    []
  );

  // Add price data for each stonk's post on postPriceFetcher success.
  const postPriceFetcherOnSuccess = (stonksWithPricedTimestamps) =>
    setStonks((currStonks) =>
      currStonks.map((currStonk) => ({
        ...currStonk,
        posts: currStonk.posts.map((currStonkPost) => ({
          ...currStonkPost,
          ...stonksWithPricedTimestamps.find(
            (stonkWithPricedTimestamp) =>
              stonkWithPricedTimestamp.stonk === currStonk.stonk &&
              stonkWithPricedTimestamp.timestamp === currStonkPost.timestamp
          ),
        })),
      }))
    );

  // Fetch price for each stonk's posts at timestamp when initialStonks updates.
  // Disable fetch's Abort Controller.
  // Updates stonks on success.
  useAsyncFetch({
    useEffectDependency: [initialStonks],
    url: "/api/price-post",
    query: { q: JSON.stringify(postPriceQuery) },
    disableController: true,
    onSuccess: postPriceFetcherOnSuccess,
  });

  // Check if price exists for any stonk
  const pricesExist = stonks.some((stonk) => stonk.price);

  // If price exists for any stonk, remove stonks without a price.
  // Reduce totalCost for each stonk.
  // Map weightedCost and gainLoss.
  const stonksCalculator = () =>
    stonks
      .filter((stonk) => (pricesExist ? stonk.price : true))
      .map((stonk) => ({
        ...stonk,
        totalCost: stonk.posts.reduce(
          (reducer, post) =>
            (reducer +=
              post.price && post.price.Value
                ? post.price.Value * post.parsedScore
                : 0),
          0
        ),
      }))
      .map((stonk) => ({
        ...stonk,
        weightedCost: stonk.totalCost / stonk.totalPoints,
        gainLoss:
          ((stonk.price - stonk.totalCost / stonk.totalPoints) /
            (stonk.totalCost / stonk.totalPoints)) *
          100,
      }));

  return { stonks: stonksCalculator(), stonkPriceFetcher };
}
