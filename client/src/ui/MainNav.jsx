import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import { ROUTES_MAP } from "../constants/nav";

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
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }
  const role = user.role ?? "customer";
  const routes = ROUTES_MAP[role];

  return (
    <Nav>
      <NavList>
        {routes.map((route) => (
          <li key={route.path}>
            <StyledNavLink to={route.path}>
              <route.icon />
              <span>{route.name}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </Nav>
  );
}

export default MainNav;
