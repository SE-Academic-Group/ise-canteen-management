import styled from "styled-components";

import Progressing from "../../ui/Progressing";
import Pagination from "../../ui/Pagination";
import SearchBox from "../../ui/SearchBox";
import CustomerBox from "./CustomerBox";
import Heading from "../../ui/Heading";

import { useCustomers } from "./useCustomers";

const Content = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
`;

const StepHeading = styled(Heading)`
  margin-bottom: 0.8rem;
  text-align: center;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28ch, 1fr));
  gap: 1.6rem;
  width: 100%;
  margin-top: 1.2rem;
`;

function SearchCustomer({ currentCustomer, handleSelectCustomer }) {
  const state = useCustomers();
  const { customers, count } = state;

  return (
    <>
      <StepHeading as="h2">Tìm thông tin khách hàng</StepHeading>
      <Content>
        <SearchBox />
        <Progressing {...state} resourceName="khách hàng">
          <Layout>
            {customers.map((customer) => (
              <CustomerBox
                key={customer._id}
                customer={customer}
                active={currentCustomer?._id === customer._id}
                onClick={() => handleSelectCustomer(customer)}
              />
            ))}
          </Layout>
        </Progressing>
        <Pagination count={count} hasBox />
      </Content>
    </>
  );
}

export default SearchCustomer;
