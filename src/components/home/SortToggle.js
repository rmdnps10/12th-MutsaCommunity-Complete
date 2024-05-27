import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { pageNumAtom } from "../../util/atom";

function SortToggle() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortType, setSortType] = useState(
    searchParams.get("sortType") === "popular" ? "인기순" : "최신 순"
  );
  const navigate = useNavigate();
  const setPageNum = useSetRecoilState(pageNumAtom);
  const handleSortChange = (event) => {
    const selectedSortType = event.target.value;
    setSortType(selectedSortType);
    if (selectedSortType === "인기순") {
      navigate("/?sortType=popular");
    } else if (selectedSortType === "최신 순") {
      navigate("/?sortType=latest");
    }
    setPageNum(1);
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
