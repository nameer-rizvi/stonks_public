import CorpusBlacklist from "./stonk.processor.blacklist";
import TextCleaner from "text-cleaner";
import sentiment from "wink-sentiment";
import { isNumber } from "simpul";

export const stonkProcessor = (responseData = []) =>
  new Promise((resolve) => {
    // Flatten response data.
    responseData = responseData.flat();

    // Return clean string.
    // Trim and condense extra spaces.
    // Remove non-alpha characters.
    // Remove stop words.
    const cleanString = (string) =>
      TextCleaner(string)
        .trim()
        .condense()
        .removeChars()
        .removeStopWords().s;

    function parse(corpus, title) {
      // If OP has declared a ticker, return that.
      const ticker =
        title.match(/\$([^\d\s]+)/) ||
        corpus.toLowerCase().match(/ticker: ([^\s]+)/i) ||
        corpus.toLowerCase().match(/nyse: ([^\s]+)/i);

      if (ticker && ticker[1]) return cleanString(ticker[1]).toUpperCase();

      // Filter tokens that have a length more than 1 character,
      // a length less than 6 characters, have characters that are
      // all caps, and aren't included in the corpus blacklist.
      let filter = (token) =>
        token &&
        token.length > 1 &&
        token.length < 6 &&
        token === token.toUpperCase() &&
        !CorpusBlacklist.includes(token);

      // Clean corpus, split corpus into token list, apply token filter.
      let tokens = cleanString(corpus)
        .split(" ")
        .filter(filter);

      // Use sort and pop to return the most common token.
      // Which is assumed to be the primary stonk for the post.
      let sort = (a, b) =>
        tokens.filter((v) => v === a).length -
        tokens.filter((v) => v === b).length;

      return tokens.sort(sort).pop();
    }

    // Initiate stonks store.
    let stonks = [];

    // Loop through responseData (reddit posts) for stonk data.
    for (let i = responseData.length - 1; i >= 0; i--) {
      // Declare reddit post.
      let post = responseData[i];

      // Create corpus for parsing.
      let corpus = post.title + " " + post.text;

      // Parse corpus for stonk.
      let stonk = parse(corpus, post.title);

      // Get sentiment score for corpus.
      post.sentiment = sentiment(corpus).score;

      // Check for index in stonks store for stonk if it exists.
      const existingStonkIndex = stonks.findIndex((i) => i.stonk === stonk);

      // If there's an index, push the post to the stonk's
      // post list, otherwise push a new stonk object.
      existingStonkIndex === -1
        ? stonks.push({ stonk, posts: [post] })
        : stonks[existingStonkIndex].posts.push(post);
    }

    // Loop through stonks to get each stonk's total points and weighted sentiment.
    for (let i = stonks.length - 1; i >= 0; i--) {
      // Initialize variable for total points.
      let totalPoints = 0;

      // Initialize variable for total sentiment.
      let totalSentiment = 0;

      // Initialize stonk's posts.
      let posts = stonks[i].posts;

      // Loop through a stonk's posts to reduce total points and total sentiment.
      for (let j = posts.length - 1; j >= 0; j--) {
        // initialize post.
        let post = posts[j];

        // Parse the post's score for numerical value.
        const parsedScore = parseFloat(post.score.replace(/,/g, ""));

        // Set the posts numerical score.
        const postScoreNum = isNumber(parsedScore) ? parsedScore : 0;

        // Add to the stonk's total points.
        totalPoints += postScoreNum;

        // Add to the stonk's total sentiment.
        totalSentiment += post.sentiment * postScoreNum;

        // Add parsedScore to post.
        stonks[i].posts[j].parsedScore = parsedScore;
      }

      // Calculate stonk's weighted sentiment.
      let weightedSentiment = totalSentiment / totalPoints;

      // Assign variables to stonk.
      stonks[i] = Object.assign(stonks[i], {
        totalPoints,
        totalSentiment,
        weightedSentiment,
      });
    }

    // Resolve stonks store.
    resolve(stonks.filter((i) => i.stonk));
  });
