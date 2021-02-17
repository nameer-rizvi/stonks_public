import { useDataInjector, useSorter, useToggle } from "../hooks";
import MainContentTableConfigs from "./MainContentTableConfigs";
import MainContentHeader from "./MainContentHeader";
import MainContentFilters from "./MainContentFilters";
import Loader from "./Loader";
import { Fragment } from "react";
import MainContentTableHeader from "./MainContentTableHeader";
import MainContentTableRow from "./MainContentTableRow";
import MainContentFootnotes from "./MainContentFootnotes";
import MainContentBuyMeACoffeeButton from "./MainContentBuyMeACoffeeButton";

function MainContent({ initialStonks, filters, fetchingNewStonks }) {
  const { stonks, stonkPriceFetcher } = useDataInjector({
    initialStonks,
  });

  const sorter = useSorter({
    array: stonks,
    initialState: { key: MainContentTableConfigs[0].key },
  });

  const showFilters = useToggle();

  return (
    <div id="main-content">
      <MainContentHeader
        showFilters={showFilters}
        sendRequest={stonkPriceFetcher.sendRequest}
        pending={stonkPriceFetcher.pending}
      />
      {showFilters.state ? (
        <MainContentFilters filters={filters} hide={showFilters.change} />
      ) : null}
      {fetchingNewStonks ? (
        <Loader />
      ) : (
        <Fragment>
          <table>
            <MainContentTableHeader {...sorter} />
            <tbody>
              {stonks.map((stonk, index) => (
                <MainContentTableRow
                  key={stonk.stonk}
                  stonk={stonk}
                  filterValues={filters.values}
                />
              ))}
            </tbody>
          </table>
          <MainContentFootnotes />
          <MainContentBuyMeACoffeeButton />
        </Fragment>
      )}
    </div>
  );
}

export default MainContent;
