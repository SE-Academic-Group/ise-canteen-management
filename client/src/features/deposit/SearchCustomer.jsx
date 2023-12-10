import styled from "styled-components";

import Heading from "../../ui/Heading";
import SearchBox from "../../ui/SearchBox";
import Spinner from "../../ui/Spinner";
import { useCustomers } from "./useCustomers";
import CustomerBox from "./CustomerBox";

const Content = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
`;

const StepHeading = styled(Heading)`
  margin-bottom: 2rem;
  text-align: center;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28ch, 1fr));
  gap: 1.6rem;
  width: 100%;
`;

function SearchCustomer() {
  const { customers, isLoading } = useCustomers();

  return (
    <>
      <StepHeading as="h2">Tìm thông tin khách hàng</StepHeading>
      <Content>
        <SearchBox />
        {isLoading ? (
          <Spinner />
        ) : (
          <Layout>
            {customers.map((customer) => (
              <CustomerBox key={customer._id} customer={customer} />
            ))}
          </Layout>
        )}
      </Content>
    </>
  );
}

export default SearchCustomer;
