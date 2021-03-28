const tagManagerId = "G-QNZLYGVS90";

export const google = {
  tagManager: {
    src: "https://www.googletagmanager.com/gtag/js?id=" + tagManagerId,
    params: [
      { name: "js", value: new Date() },
      { name: "config", value: tagManagerId },
    ],
  },
  // adSense: {
  //   dataAdClient: "ca-pub-7544419933545231",
  //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  // },
};
