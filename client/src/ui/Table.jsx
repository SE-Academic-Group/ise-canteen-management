import { createContext, useContext } from "react";
import styled from "styled-components";
import {
  formatDate,
  formatDateTime,
  formatVietnameseCurrency,
  formatVietnamesePhoneNumber,
  getImageUrl,
  padNumber,
} from "../utils/helpers";

const StyledTable = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  &:hover {
    background-color: var(--color-grey-50);
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const Name = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
  word-break: break-all;
`;

const StyledAmount = styled.span`
  font-weight: 500;
`;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

const StyledThumbnail = styled.img`
  display: block;
  width: 48px;
  aspect-ratio: 1 / 1;
  margin-block: 0.8rem;
  border-radius: 2px;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  background-color: var(--color-grey-200);
  font-size: 0.8rem;
  font-style: italic;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  overflow: hidden;

  & span {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const NoThumbnail = styled.div`
  display: block;
  width: 48px;
  aspect-ratio: 1 / 1;
  margin-block: 0.8rem;
  border-radius: 2px;
  transform: scale(1.5) translateX(-7px);
  background-color: var(--color-brand-500);
  color: white;
  outline: 2px solid var(--color-grey-100);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Number = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledImg = styled.img`
  display: block;
  width: 80px;
  margin: 0.4rem;
  border-radius: 4px;
  border: 1px solid var(--color-grey-100);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  background-color: var(--color-grey-200);
  transform: scale(1.25) translateX(-7px);
  border-radius: 1px;
  font-size: 0.8rem;
  font-style: italic;
`;

const StyledRating = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const Text = styled.span``;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>Không có dữ liệu để hiển thị</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Amount({ children }) {
  return (
    <StyledAmount>
      {children != null ? (
        formatVietnameseCurrency(children)
      ) : (
        <>
          <span className="sr-only">No amount</span>
          <span role="presentation">___ ___ __ </span>
        </>
      )}
    </StyledAmount>
  );
}

function Phone({ children }) {
  return <Text>{formatVietnamesePhoneNumber(children)}</Text>;
}

function Date({ children }) {
  return <Text>{formatDate(children)}</Text>;
}

function DateTime({ children }) {
  return <Text>{formatDateTime(children, true)}</Text>;
}

function Serial({ children }) {
  return <Text>{padNumber(children, 3)}</Text>;
}

function Thumbnail({ src, alt, placeholder }) {
  if (!src) {
    return <NoThumbnail>{placeholder ?? alt.at(0) ?? "%"}</NoThumbnail>;
  }

  return <StyledThumbnail src={src} alt={alt} />;
}

function Img({ src, ...props }) {
  if (!src) {
    return <NoThumbnail>Ảnh</NoThumbnail>;
  }

  return <StyledImg src={getImageUrl(src)} {...props} />;
}

function Rating({ children }) {
  return <StyledRating>{children?.toFixed(1) ?? "__"}</StyledRating>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.Column = {
  Name,
  Amount,
  Thumbnail,
  Description,
  Stacked,
  NoThumbnail,
  Number,
  Text,
  Rating,
  Img,
  Phone,
  Date,
  DateTime,
  Serial,
};

export default Table;
