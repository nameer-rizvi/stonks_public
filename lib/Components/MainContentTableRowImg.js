import { renderSymbol } from "../utils";
import RedditSVG from "./RedditSVG";
import { link } from "../constants";

function MainContentTableRowEmoji({ weightedSentiment }) {
  const scale = {
    "100": "🤩",
    "90": "😍",
    "80": "🥰",
    "70": "🤗",
    "60": "😊",
    "50": "😁",
    "40": "😄",
    "30": "😃",
    "20": "😀",
    "10": "🙂",
    "0": "😐",
    "-10": "🙁",
    "-20": "😞",
    "-30": "😣",
    "-40": "😖",
    "-50": "😩",
    "-60": "😫",
    "-70": "😤",
    "-80": "😠",
    "-90": "😡",
    "-100": "🤬",
  };

  const title = "Weighted sentiment score: " + renderSymbol(weightedSentiment);

  const limitedScore =
    Math.ceil(Math.min(Math.max(weightedSentiment, -100), 100) / 10) * 10;

  const emoji = weightedSentiment > 100 ? "🚀" : scale[`${limitedScore}`];

  return <span title={title}>{emoji}</span>;
}

function MainContentTableRowImg(props = {}) {
  const {
    getLength,
    showPostToggle,
    hasPosts,
    showPosts,
    weightedSentiment,
    stonk,
  } = props;

  const components = [
    () => (
      <td onClick={showPostToggle}>
        <RedditSVG fill={hasPosts && showPosts ? "#f54602" : ""} />
      </td>
    ),
    () => (
      <td>
        <MainContentTableRowEmoji weightedSentiment={weightedSentiment} />
      </td>
    ),
  ];

  return getLength
    ? components.length
    : components.map((Component, index) => <Component key={index} />);
}

export default MainContentTableRowImg;
