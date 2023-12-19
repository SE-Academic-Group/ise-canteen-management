import React from "react";
import styled from "styled-components";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

import { PAGE_SIZE } from "../constants/api";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationBox = styled.div`
  width: 100%;
  margin-top: 2.4rem;
  padding: 1.2rem;
  border-radius: 8px;
  border: 2px dashed var(--color-brand-200);
  background-color: var(--color-grey-0);
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  @media (width < 768px) {
    font-size: 1.2rem;
  }

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  @media (width < 768px) {
    font-size: 1.2rem;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count, hasBox = false, compact = false }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  const Container = hasBox ? PaginationBox : React.Fragment;

  return (
    <Container>
      <StyledPagination>
        {!compact ? (
          <P>
            Hiển thị <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> &rarr;{" "}
            <span>
              {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
            </span>{" "}
            trong <span>{count}</span> kết quả
          </P>
        ) : (
          <P>
            Trang <span>{currentPage}</span> / <span>{pageCount}</span>
          </P>
        )}

        <Buttons>
          <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
            <HiChevronLeft /> <span>Trước</span>
          </PaginationButton>

          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === pageCount}
          >
            <span>Sau</span>
            <HiChevronRight />
          </PaginationButton>
        </Buttons>
      </StyledPagination>
    </Container>
  );
}

export default Pagination;
