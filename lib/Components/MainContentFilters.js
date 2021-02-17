import { filters } from "../constants";

const MainContentFilters = ({ filters: localStorage, hide }) => (
  <div id="filters-container">
    <h2 id="filters-title">reddit post filters</h2>
    {filters.map((filter, filterIndex) => (
      <div key={filterIndex} className="filters-section">
        <span className="filters-label">{filter.label || filter.key}</span>
        <ul className="filters-list">
          {filter.options.map((filterOption, optionIndex) => (
            <li key={optionIndex} className="filters-list-item">
              <button
                className={
                  localStorage.values[filter.key] === filterOption.value
                    ? "checked"
                    : ""
                }
                onClick={() => {
                  localStorage.set({ [filter.key]: filterOption.value });
                  hide();
                }}
              >
                {filterOption.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <button id="close" onClick={hide}>
      close
    </button>
  </div>
);

export default MainContentFilters;
