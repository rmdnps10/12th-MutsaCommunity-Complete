import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

function SortToggle() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(
    searchParams.get("sortType") === "latest" ? "최신 순" : "인기순"
  );
  const navigate = useNavigate();
  const handleSortChange = (event) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
    if (selectedSortType === "인기순") {
      navigate("/?sortType=popular");
    } else if (selectedSortType === "최신 순") {
      navigate("/?sortType=latest");
    }
  };
  return (
    <>
      <StyledSelect
        onChange={handleSortChange}
        value={sortType}
        name="정렬 타입"
      >
        <option>인기순</option>
        <option>최신 순</option>
      </StyledSelect>
    </>
  );
}

const StyledSelect = styled.select`
  font-size: 1.5rem;
  font-family: "GmarketSans";
  outline: none;
  padding: 0.4rem;
  margin-left: 2rem;
`;

export default SortToggle;
