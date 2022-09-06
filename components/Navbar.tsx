import Link from "next/link";
import styled, { useTheme } from "styled-components";

import { ButtonStyle, LinkButton } from "components/Buttons";
import SectionContainer from "components/SectionContainer";
import Favorite from "icons/favorite-border.svg";
import Menu from "icons/menu-book.svg";
import Logo from "logo.svg";
import { useRouter } from "next/router";
import SearchFieldForNavbar from "./SearchFieldForNavbar";

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

const NavLink = styled.li<{ isActive: boolean }>`
  position: relative;
  display: block;
  height: 100%;
`;

const LinkLine = styled.span<{ isActive: boolean }>`
  position: absolute;
  bottom: 0;
  display: none;
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.colors.primary};
  pointer-events: none;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${(props) => (props.isActive ? "block" : "none")};

    ${NavLink}:hover & {
      display: block;
      background: ${({ theme }) => theme.colors.textPrimaryHover};
    }
  }
`;

interface NavItemProps {
  href: string;
  icon: any;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive = false }: NavItemProps) {
  const theme = useTheme();

  const compactStyle = {
    hoverColor: theme.colors.textPrimaryHover,
    ...buttonStyleCompactCommon,
  };
  const regularStyle = {
    gap: "1.2rem",
    fontSize: "2rem",
    hoverColor: theme.colors.textPrimaryHover,
    ...buttonStyleRegularCommon,
  };

  if (isActive) {
    compactStyle.color = theme.colors.primary;
    regularStyle.color = theme.colors.primary;
  }

  return (
    <NavLink isActive={isActive}>
      <Link href={href} passHref>
        <LinkButton
          icon={icon}
          label={label}
          compactStyle={compactStyle}
          regularStyle={regularStyle}
          minWidthToShowRegularLayout={theme.breakpoints.tablet}
        />
      </Link>
      <LinkLine isActive={isActive} />
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
  const router = useRouter();

  const links = [
    { href: "/recipes", label: "Recipes", icon: <Menu /> },
    { href: "/favorites", label: "Favorites", icon: <Favorite /> },
  ];

  return (
    <StyledNav>
      <NavLinkList>
        {links.map((link, index) => (
          <NavItem
            key={index}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={router.asPath.startsWith(link.href)}
          />
        ))}
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

const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledNavbar = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: ${({ theme }) => theme.navbar.mobileHeight};
  border-bottom: ${({ theme }) => theme.navbar.borderWidth} solid;
  border-color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: ${({ theme }) => theme.navbar.tabletHeight};
    padding: 10px 0;
  }
`;

export default function Navbar() {
  return (
    <StyledNavbar>
      <SectionContainer>
        <NavbarContent>
          <HomepageLink />
          <NavAndSearch>
            <Nav />
            <SearchFieldForNavbar
              buttonWidth={buttonStyleCompactCommon.width!}
              iconSizes={{
                mobile: buttonStyleCompactCommon.iconSize!,
                tablet: buttonStyleRegularCommon.iconSize!,
              }}
            />
          </NavAndSearch>
        </NavbarContent>
      </SectionContainer>
    </StyledNavbar>
  );
}
