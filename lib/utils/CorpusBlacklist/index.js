export function getCorpusBlacklist() {
  try {
    const CorpusBlacklist = require("./blacklist.json");
    return CorpusBlacklist || [];
  } catch (error) {
    console.error("CorpusBlacklist.getCorpusBlacklist(): " + error.toString());
    return [];
  }
}

function handleAddToCorpusBlacklistWrite(error, countTotal, countAdditions) {
  if (error) {
    const id = "CorpusBlacklist.handleAddToCorpusBlacklistWrite()";
    console.error(`${id}: ${error.toString()}`);
  } else {
    console.log(
      `✅ CorpusBlacklist updated: ${countTotal} (+${countAdditions}).`
    );
  }
}

// fs.writeFile only works locally so far...

export function addToCorpusBlacklist(stonksWithouPrices) {
  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    try {
      const CorpusBlacklist = getCorpusBlacklist();

      const newCorpusBlacklist = [...CorpusBlacklist, ...stonksWithouPrices];

      const uniqueCorpusBlacklist = [...new Set(newCorpusBlacklist)].sort();

      const countTotal = uniqueCorpusBlacklist.length;

      const countAdditions = countTotal - CorpusBlacklist.length;

      const filename = "blacklist.json";

      const filepath =
        process.env.PWD + "/lib/utils/CorpusBlacklist/" + filename;

      console.log({ filepath });

      const fs = require("fs");

      if (fs)
        fs.writeFile(filepath, JSON.stringify(uniqueCorpusBlacklist), (error) =>
          handleAddToCorpusBlacklistWrite(error, countTotal, countAdditions)
        );
    } catch (error) {
      console.error(
        "CorpusBlacklist.updateCorpusBlacklist(): " + error.toString()
      );
    }
  }
}
