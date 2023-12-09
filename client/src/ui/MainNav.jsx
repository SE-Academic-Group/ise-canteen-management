import styled from "styled-components";
import { NavLink } from "react-router-dom";

import {
  HiOutlineBuildingStorefront,
  HiOutlineCube,
  HiOutlineChartBarSquare,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineCog8Tooth,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { BiFoodMenu } from "react-icons/bi";

const Nav = styled.nav`
  block-size: 100%;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  block-size: 100%;

  & li:last-child {
    margin-top: auto;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Trang chủ</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUserGroup />
            <span>Người dùng</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/orders">
            <HiOutlineShoppingBag />
            <span>Đơn hàng</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/products">
            <HiOutlineCube />
            <span>Sản phẩm</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/menus">
            <BiFoodMenu />
            <span>Thực đơn</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/inventory">
            <HiOutlineBuildingStorefront />
            <span>Kho hàng</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/stats">
            <HiOutlineChartBarSquare />
            <span>Thống kê</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog8Tooth />
            <span>Cài đặt</span>
          </StyledNavLink>
        </li>
      </NavList>
    </Nav>
  );
}

export default MainNav;
