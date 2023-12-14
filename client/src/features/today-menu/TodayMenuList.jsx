import styled from "styled-components";
import ErrorLoading from "../../ui/ErrorLoading";
import Spinner from "../../ui/Spinner";
import { useTodayMenu } from "./useTodayMenu";
import TodayMenuItemDataBox from "./TodayMenuItemDataBox";

const Border = styled.div`
  border: 2px solid var(--color-brand-600);
  padding: 2.4rem;
  border-radius: 8px;
`;

const Layout = styled.div.attrs({
  className: "custom-scrollbar",
})`
  --_grid-item-width: 20rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--_grid-item-width, 20rem), 1fr)
  );
  gap: 2.4rem;
  max-block-size: 80rem;
  overflow: auto;
  padding-inline-end: 0.8rem;
  margin-inline-end: -0.8rem;
`;

function TodayMenuList() {
  const { isLoading, error, menuItems } = useTodayMenu();

  if (error) {
    return <ErrorLoading error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Border className="customer-scrollbar">
      <Layout>
        {menuItems.map((item) => (
          <TodayMenuItemDataBox item={item} key={item._id} />
        ))}
      </Layout>
    </Border>
  );
}

export default TodayMenuList;
