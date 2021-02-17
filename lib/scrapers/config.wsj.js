import { makeDateStringTime } from "../utils";

const wsj = ({ stonk, timestamp }) => ({
  method: "GET",
  url: "https://api.wsj.net/api/michelangelo/timeseries/history",
  headers: {
    ["Dylan2010.EntitlementToken"]: "57494d5ed7ad44af85bc59a51dd87c90",
  },
  params: {
    ckey: "57494d5ed7",
    json: {
      EntitlementToken: "57494d5ed7ad44af85bc59a51dd87c90",
      IncludeMockTick: true,
      FilterNullSlots: false,
      FilterClosedPoints: true,
      IncludeClosedSlots: false,
      UseExtendedTimeFrame: true,
      ResetTodaysAfterHoursPercentChange: false,
      Series: [
        {
          Key: "/US//" + stonk,
          Dialect: "Charting",
          Kind: "Ticker",
          SeriesId: "s1",
          DataTypes: ["Last"],
        },
      ],
      ...(timestamp
        ? {
            Step: "P1D",
            TimeFrame: "custom",
            StartDate: makeDateStringTime(timestamp),
            EndDate: makeDateStringTime(timestamp, 1),
            IncludeCurrentQuotes: false,
            ShowPreMarket: true,
            ShowAfterHours: true,
            WantPriorClose: true,
            IncludeOfficialClose: true,
            InjectOpen: true,
          }
        : {
            Step: "P1D",
            TimeFrame: "D1",
            IncludeCurrentQuotes: true,
            ShowPreMarket: false,
            ShowAfterHours: false,
            WantPriorClose: false,
            IncludeOfficialClose: false,
            InjectOpen: false,
          }),
    },
  },
});

export default wsj;
