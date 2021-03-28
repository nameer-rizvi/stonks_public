import { useEffect, Fragment } from "react";
import {
  useGoogleTagManager,
  useFilters,
  makeMinutes,
  HTMLHead,
  Error,
  MainContent,
  Placeholder,
} from "../lib";
import useAsyncFetch from "async-fetch";
import { isArray } from "simpul";

function Home() {
  useGoogleTagManager();

  const { filters, setFilters } = useFilters();

  const { error, sendRequest, data, pending } = useAsyncFetch({
    useEffectDependency: [filters],
    url: "/api/stonks",
    query: filters,
    poll: makeMinutes(5),
  });

  const mainContent = error ? (
    <Error error={error} sendRequest={sendRequest} />
  ) : isArray(data) ? (
    <MainContent
      initialStonks={data}
      filters={{ values: filters, set: setFilters }}
      fetchingNewStonks={pending}
    />
  ) : (
    <Placeholder />
  );

  return (
    <Fragment>
      <HTMLHead />
      <main>{mainContent}</main>
    </Fragment>
  );
}

export default Home;
