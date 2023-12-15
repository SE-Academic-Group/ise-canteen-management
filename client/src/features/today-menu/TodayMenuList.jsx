import styled from "styled-components";
import { useTodayMenu } from "./useTodayMenu";

import ErrorLoading from "../../ui/ErrorLoading";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Info from "../../ui/Info";
import TodayMenuItemDataBox from "./TodayMenuItemDataBox";

const Border = styled.div`
  border: 2px solid var(--color-brand-600);
  padding: 2.4rem;
  border-radius: 8px;
`;

const Layout = styled.div`
  --_grid-item-width: 20rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--_grid-item-width, 20rem), 1fr)
  );
  gap: 2.4rem;
`;

function TodayMenuList() {
  const { isLoading, error, menuItems, isAlreadyCreated, count } =
    useTodayMenu();

  if (error) {
    return <ErrorLoading error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAlreadyCreated) {
    return (
      <Info>Chưa có thực đơn cho hôm nay hoặc đã hết thời gian hoạt động</Info>
    );
  }

  if (!menuItems.length) {
    return <Empty resourceName="sản phẩm" />;
  }

  return (
    <Border className="customer-scrollbar">
      <Layout>
        {menuItems.map((item) => (
          <TodayMenuItemDataBox item={item} key={item._id} />
        ))}
      </Layout>
      <Pagination count={count} hasBox />
    </Border>
  );
}

export default TodayMenuList;
