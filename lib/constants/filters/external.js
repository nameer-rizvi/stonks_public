export default {
  key: "external",
  options: [
    {
      value: "fidelity",
      label: "fidelity",
      link: (s) =>
        "https://snapshot.fidelity.com/fidresearch/snapshot/landing.jhtml#/research?symbol=" +
        s,
    },
    {
      value: "tda",
      label: "td ameritrade",
      link: (s) =>
        "https://research.tdameritrade.com/grid/public/research/stocks/summary?symbol" +
        s,
    },
    {
      value: "tos",
      label: "thinkorswim",
      link: (s) => "https://trade.thinkorswim.com/?symbol=" + s,
    },
    {
      value: "googleSearch",
      label: "google search",
      link: (s) => "https://www.google.com/search?q=quote " + s,
      isDefault: true,
    },
    {
      value: "googleFinance",
      label: "google finance",
      link: (s) => "https://www.google.com/finance/quote/" + s + ":NYSE",
    },
    {
      value: "yahoo",
      label: "yahoo finance",
      link: (s) => "https://finance.yahoo.com/quote/" + s,
    },
    {
      value: "robinhood",
      label: "robinhood 💩",
      link: (s) => "https://robinhood.com/stocks/" + s,
    },
  ],
};
