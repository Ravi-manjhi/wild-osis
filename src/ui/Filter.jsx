import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;

  .active {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParam, setSearchParam] = useSearchParams();

  const currentFilter = searchParam.get(filterField) || "all";

  function handleClick(value) {
    searchParam.set(filterField, value);
    if (searchParam.get("page")) {
      searchParam.set("page", 1);
    }
    setSearchParam(searchParam);
  }

  return (
    <StyledFilter>
      {options.map((el) => (
        <FilterButton
          key={el.value}
          onClick={() => handleClick(el.value)}
          className={el.value === currentFilter ? "active" : ""}
          disabled={el.value === currentFilter}
        >
          {el.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
