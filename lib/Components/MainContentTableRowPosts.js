import { renderSymbol } from "../utils";
import ta from "time-ago";
import { number as simpulNumber } from "simpul";

const anchorLinkProps = ({ href, ...rest }) => ({
  href: "https://www.reddit.com" + href.split(".com")[1],
  target: "_blank",
  ...rest,
});

const MainContentTableRowPosts = ({ posts }) => (
  <ul className="posts">
    {posts.map((post, index) => (
      <li key={index} className="post">
        <a {...anchorLinkProps({ title: post.text, href: post.postLink })}>
          {post.title}
        </a>
        <span>
          Posted {ta.ago(post.timestamp)} by{" "}
          <a {...anchorLinkProps({ href: post.authorLink })}>{post.author}</a>.
        </span>
        <span>
          {[
            "Flair: " + post.flair,
            "Upvotes: " +
              (post.parsedScore ? post.parsedScore.toLocaleString() : 0),
            "Sentiment: " + renderSymbol(post.sentiment),
            "Approx. Price: " +
              (post.price && post.price.Value
                ? simpulNumber.finance(post.price.Value) +
                  " at " +
                  new Date(post.price.Date).toLocaleDateString()
                : ""),
          ]
            .filter(Boolean)
            .join(" | ")}
        </span>
      </li>
    ))}
  </ul>
);

export default MainContentTableRowPosts;
