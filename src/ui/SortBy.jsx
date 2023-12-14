import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export default function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();

  function handleChange(e) {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  }

  const sortBy = searchParam.get("sortBy") || "";

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}
