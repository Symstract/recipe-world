import Link from "next/link";
import styled from "styled-components";

import SectionContainer from "./SectionContainer";
import Favorite from "../icons/favorite-border.svg";
import Menu from "../icons/menu-book.svg";
import Search from "../icons/search.svg";
import Logo from "../logo.svg";

const StyledHomepageLink = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 2.4rem;
  height: 100%;

  svg {
    width: 120px;
    height: 26px;
  }
`;

function HomepageLink() {
  return (
    <Link href="/" passHref>
      <StyledHomepageLink>
        <Logo />
      </StyledHomepageLink>
    </Link>
  );
}

const NavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  span {
    display: none;
  }
`;

const StyledNavItem = styled.li`
  width: 5rem;
  height: 100%;
`;

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  return (
    <StyledNavItem>
      <Link href={href} passHref>
        <NavLink>
          {icon}
          <span>{label}</span>
        </NavLink>
      </Link>
    </StyledNavItem>
  );
}

const NavLinkList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StyledNav = styled.nav`
  height: 100%;
`;

function Nav() {
  return (
    <StyledNav>
      <NavLinkList>
        <NavItem href="#" icon={<Menu />} label="Recipes"></NavItem>
        <NavItem href="#" icon={<Favorite />} label="Favorites"></NavItem>
      </NavLinkList>
    </StyledNav>
  );
}

const NavAndSearch = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const StyledSearchPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 5rem;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function SearchPlaceholder() {
  return (
    <StyledSearchPlaceholder>
      <Search />
    </StyledSearchPlaceholder>
  );
}

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 5.1rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export default function Header() {
  return (
    <StyledHeader>
      <SectionContainer>
        <HeaderContent>
          <HomepageLink />
          <NavAndSearch>
            <Nav />
            <SearchPlaceholder />
          </NavAndSearch>
        </HeaderContent>
      </SectionContainer>
    </StyledHeader>
  );
}
