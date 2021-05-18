export function getCorpusBlacklist() {
  try {
    const CorpusBlacklist = require("./blacklist.json");
    return CorpusBlacklist || [];
  } catch (error) {
    console.error("CorpusBlacklist.getCorpusBlacklist(): " + error.toString());
    return [];
  }
}

function handleAddToCorpusBlacklistWrite(error, uniqueCorpusBlacklist) {
  if (error) {
    const id = "CorpusBlacklist.handleAddToCorpusBlacklistWrite()";
    console.error(`${id}: ${error.toString()}`);
  } else {
    console.log(`✅ CorpusBlacklist updated: ${uniqueCorpusBlacklist.length}`);
  }
}

export function addToCorpusBlacklist(stonksWithouPrices) {
  try {
    if (typeof window === "undefined") {
      const CorpusBlacklist = getCorpusBlacklist();

      const newCorpusBlacklist = [...CorpusBlacklist, ...stonksWithouPrices];

      const uniqueCorpusBlacklist = [...new Set(newCorpusBlacklist)].sort();

      const filename = "blacklist.json";

      const filepath =
        process.env.PWD + "/lib/utils/CorpusBlacklist/" + filename;

      console.log({ filepath });

      const fs = require("fs");

      if (fs)
        fs.writeFile(filepath, JSON.stringify(uniqueCorpusBlacklist), (error) =>
          handleAddToCorpusBlacklistWrite(error, uniqueCorpusBlacklist)
        );
    }
  } catch (error) {
    console.error(
      "CorpusBlacklist.updateCorpusBlacklist(): " + error.toString()
    );
  }
}
