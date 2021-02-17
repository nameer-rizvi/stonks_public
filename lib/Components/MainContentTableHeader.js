import MainContentTableRowImg from "./MainContentTableRowImg";
import MainContentTableConfigs from "./MainContentTableConfigs";

const MainContentTableHeader = ({ sort, setSort }) => (
  <thead>
    <tr>
      {MainContentTableRowImg().map((i, index) => (
        <th key={index} className="img" />
      ))}
      {MainContentTableConfigs.map(({ key, header }, index) => {
        const isSort = sort.key === key;

        const updateSort = () =>
          setSort((currSort) => ({
            key,
            reverse: !isSort ? false : !currSort.reverse,
          }));

        const className = isSort ? "sorted " + sort.reverse.toString() : "";

        return (
          <th
            key={index}
            onClick={updateSort}
            className={className}
            scope="col"
          >
            {header}
          </th>
        );
      })}
    </tr>
  </thead>
);

export default MainContentTableHeader;
