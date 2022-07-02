import Link from "next/link";
import styled, { useTheme } from "styled-components";

import Button, { ButtonStyle } from "./Button";
import SectionContainer from "./SectionContainer";
import Favorite from "../icons/favorite-border.svg";
import Menu from "../icons/menu-book.svg";
import Search from "../icons/search.svg";
import Logo from "../logo.svg";

// Common button styles
// =============================================================================

const buttonStyleCompactCommon: ButtonStyle = {
  width: "5rem",
  height: "100%",
  iconSize: "2.4rem",
  fontSize: "1.6rem",
};

const buttonStyleRegularCommon: ButtonStyle = {
  height: "100%",
  iconSize: "3.2rem",
};

// Components
// =============================================================================

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

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-right: 10rem;

    svg {
      width: 175px;
      height: 46px;
    }
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

const NavLink = styled.li`
  display: block;
  height: 100%;
`;

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive = false }: NavItemProps) {
  const theme = useTheme();

  const activeColor = "blue";
  const compactStyle = {
    ...buttonStyleCompactCommon,
  };
  const regularStyle = {
    gap: "1.2rem",
    fontSize: "2rem",
    ...buttonStyleRegularCommon,
  };

  if (isActive) {
    compactStyle.color = activeColor;
    regularStyle.color = activeColor;
    regularStyle.bottomBorderWidth = "3px";
  }

  return (
    <NavLink>
      <Link href={href} passHref>
        <Button
          icon={icon}
          label={label}
          as="a"
          href={href}
          compactStyle={compactStyle}
          regularStyle={regularStyle}
          minWidthToShowRegularLayout={theme.breakpoints.tablet}
        />
      </Link>
    </NavLink>
  );
}

const NavLinkList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 5rem;
  }
`;

const StyledNav = styled.nav`
  height: 100%;
`;

function Nav() {
  return (
    <StyledNav>
      <NavLinkList>
        <NavItem href="recipes" icon={<Menu />} label="Recipes" />
        <NavItem href="/" icon={<Favorite />} label="Favorites" />
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

function SearchPlaceholder() {
  const theme = useTheme();

  return (
    <Button
      icon={<Search />}
      compactStyle={buttonStyleCompactCommon}
      regularStyle={{ width: "5rem", ...buttonStyleRegularCommon }}
      minWidthToShowRegularLayout={theme.breakpoints.tablet}
    />
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
  height: calc(5rem + 1px);
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: calc(6.6rem + 1px);
    padding: 10px 0;
  }
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
