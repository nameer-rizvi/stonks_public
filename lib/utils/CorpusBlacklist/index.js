export const importCorpusBlacklist = () => require("./blacklist.json");

export function getCorpusBlacklist() {
  try {
    const CorpusBlacklist = importCorpusBlacklist();
    return CorpusBlacklist;
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
    console.log(`⚫ CorpusBlacklist updated: ${uniqueCorpusBlacklist.length}`);
  }
}

export function addToCorpusBlacklist(stonksWithouPrices) {
  try {
    if (typeof window === "undefined") {
      const CorpusBlacklist = importCorpusBlacklist();
      const newCorpusBlacklist = [...CorpusBlacklist, ...stonksWithouPrices];
      const uniqueCorpusBlacklist = [...new Set(newCorpusBlacklist)].sort();
      const fs = require("fs");
      if (fs)
        fs.writeFile(
          "./lib/utils/CorpusBlacklist/blacklist.json",
          JSON.stringify(uniqueCorpusBlacklist),
          (error) =>
            handleAddToCorpusBlacklistWrite(error, uniqueCorpusBlacklist)
        );
    }
  } catch (error) {
    console.error(
      "CorpusBlacklist.updateCorpusBlacklist(): " + error.toString()
    );
  }
}
