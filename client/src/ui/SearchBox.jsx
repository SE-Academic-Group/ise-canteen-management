import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

const SearchBoxContainer = styled.form`
  display: inline-flex;
  align-items: stretch;
  gap: 1px;
`;

const SearchButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  gap: 0.25rem;
`;

const SearchInput = styled(Input)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

function SearchBox({ queryName = "q" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(() => searchParams.get(queryName) || "");

  function handleChange(e) {
    setQ(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (q) {
      searchParams.set("q", q);
    } else {
      searchParams.delete("q");
    }

    setSearchParams(searchParams);
  }

  return (
    <SearchBoxContainer onSubmit={handleSubmit}>
      <SearchInput value={q} onChange={handleChange} />
      <SearchButton>Tìm kiếm</SearchButton>
    </SearchBoxContainer>
  );
}

export default SearchBox;
