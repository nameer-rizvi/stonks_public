const subreddit = ({ subreddit, t, sort }) => ({
  api: {
    url: "https://ns.reddit.com/r/" + subreddit + "/search/",
    params: {
      t,
      sort,
      q: "flair:DD",
      restrict_sr: "on",
    },
  },
  selector: {
    container: "div.contents div.search-result",
    text: {
      title: "a.search-title",
      flair: "span.linkflairlabel",
      score: "span.search-score",
      author: "a.author",
      text: "div.search-result-body",
    },
    attr: {
      timestamp: {
        selector: "span.search-time time",
        attr: "datetime",
      },
      postLink: {
        selector: "a.search-title",
        attr: "href",
      },
      authorLink: {
        selector: "a.author",
        attr: "href",
      },
    },
  },
});

export default subreddit;
