import styled from "styled-components";
import { useTodayMenu } from "./useTodayMenu";

import ErrorLoading from "../../ui/ErrorLoading";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import TodayMenuItemDataBox from "./TodayMenuItemDataBox";
import Info from "../../ui/Info";

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
  const { isLoading, error, menuItems, isAlreadyCreated } = useTodayMenu();

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
    </Border>
  );
}

export default TodayMenuList;
