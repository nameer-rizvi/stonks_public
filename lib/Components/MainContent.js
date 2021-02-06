import { Fragment } from "react";
import { useDataInjector, useSorter, useShowFilters } from "../hooks";
import MainContentTableConfigs from "./MainContentTableConfigs";
import MainContentHeader from "./MainContentHeader";
import MainContentFilters from "./MainContentFilters";
import Loader from "./Loader";
import MainContentTableHeader from "./MainContentTableHeader";
import MainContentTableRow from "./MainContentTableRow";
import MainContentFootnotes from "./MainContentFootnotes";
import MainContentBuyMeACoffeeButton from "./MainContentBuyMeACoffeeButton";

function MainContent({ initialStonks, fetchingNewStonks, params }) {
  const { stonks, stonkPriceFetcher } = useDataInjector({
    initialStonks,
  });

  const { sort, setSort } = useSorter({
    array: stonks,
    initialState: { key: MainContentTableConfigs[0].key, reverse: false },
  });

  const { showFilters, setShowFilters } = useShowFilters();

  return (
    <div id="main-content">
      <MainContentHeader
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        sendRequest={stonkPriceFetcher.sendRequest}
        pending={stonkPriceFetcher.pending}
      />
      {showFilters ? (
        <MainContentFilters params={params} setShowFilters={setShowFilters} />
      ) : null}
      {fetchingNewStonks ? (
        <Loader />
      ) : (
        <table>
          <MainContentTableHeader sort={sort} setSort={setSort} />
          <tbody>
            {stonks.map((stonk, index) => (
              <MainContentTableRow
                key={stonk.stonk}
                params={params.values}
                stonk={stonk}
              />
            ))}
          </tbody>
        </table>
      )}
      {!fetchingNewStonks ? (
        <Fragment>
          <MainContentFootnotes />
          <MainContentBuyMeACoffeeButton />
        </Fragment>
      ) : null}
    </div>
  );
}

export default MainContent;
