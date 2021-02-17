import { useToggle } from "../hooks";
import { filters } from "../constants";
import { Fragment } from "react";
import MainContentTableRowImg from "./MainContentTableRowImg";
import MainContentTableConfigs from "./MainContentTableConfigs";
import MainContentTableRowPosts from "./MainContentTableRowPosts";

function MainContentTableRow({ stonk, filterValues }) {
  const toggle = useToggle();

  const hasPosts = stonk.posts && stonk.posts.length;

  const openExternalLink = () =>
    window.open(
      filters
        .find((i) => i.key === "external")
        .options.find((i) => i.value === filterValues.external)
        .link(stonk.stonk)
    );

  return (
    <Fragment>
      <tr className="row-main">
        <MainContentTableRowImg
          showPostToggle={toggle.change}
          hasPosts={hasPosts}
          showPosts={toggle.state}
          weightedSentiment={stonk.weightedSentiment}
          stonk={stonk.stonk}
        />
        {MainContentTableConfigs.map(({ key, cell, symbolize }, index) => {
          const value = stonk[key];

          const isPositive = value > 0;

          const isNegative = value < 0;

          const className =
            (symbolize && ((isPositive && "gain") || (isNegative && "loss"))) ||
            undefined;

          const label = (cell && cell(stonk)) || value || "-";

          return (
            <td
              key={index}
              scope="col"
              className={className}
              onClick={openExternalLink}
            >
              {label}
            </td>
          );
        })}
      </tr>
      {toggle.state && hasPosts ? (
        <tr>
          <td
            colSpan={
              MainContentTableConfigs.length +
              MainContentTableRowImg({ getLength: true })
            }
          >
            <MainContentTableRowPosts posts={stonk.posts} />
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}

export default MainContentTableRow;
