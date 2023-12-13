import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SelectFIlter({ options, filterField, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleChange(e) {
    const value = e.target.value;

    if (value === currentFilter) {
      return;
    }

    if (value === "all") {
      searchParams.delete(filterField);
      searchParams.delete("page");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(filterField, value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={currentFilter}
      onChange={handleChange}
      {...props}
    />
  );
}

export default SelectFIlter;
