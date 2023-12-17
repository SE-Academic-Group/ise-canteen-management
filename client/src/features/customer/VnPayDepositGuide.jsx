import styled from "styled-components";

const Section = styled.section`
  padding: 1.6rem;
  border-radius: 8px;
  background-color: var(--color-grey-0);
  border: 2px dashed var(--color-grey-200);
`;

const Heading = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin-block-end: 0.8rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-inline-start: 2rem;
  font-size: 1.4rem;

  li:not(:last-child) {
    margin-block-end: 0.8rem;
  }
`;

function VnPayDepositGuide() {
  return (
    <Section>
      <Heading>Hướng dẫn nạp tiền vào tài khoản</Heading>
      <List>
        <li>
          Bước 1: Nhấn vào nút nạp tiền. Bạn sẽ được điều hướng sang trang nạp
          tiền của <strong>VnPay</strong>
        </li>
        <li>
          Bước 2: Làm theo hướng dẫn, nhập đầy đủ những thông tin cần thiết
        </li>
        <li>
          Bước 3.1: Nếu thành công, vui lòng trở lại màn hình ứng dụng để kiểm
          tra số dư của bạn. Hãy kiên nhẫn trong vài phút nếu như số dư chưa
          được.
        </li>
        <li>
          Bước 3.2: Nếu thất bại, vui lòng kiểm tra lại quy trình của bạn. Nếu
          mọi thứ đều ổn, hãy thông báo vấn đề cho ban quản lý
        </li>
      </List>
    </Section>
  );
}

export default VnPayDepositGuide;
