import styled, { useTheme } from "styled-components";

import { LinkButton } from "./Buttons";
import Facebook from "../icons/facebook-brands.svg";
import Instagram from "../icons/instagram-brands.svg";
import Twitter from "../icons/twitter-brands.svg";

const SocialMediaLinkList = styled.ul`
  display: flex;
  gap: 16px;
`;

interface SocialMediaLinkProps {
  icon: any;
  href: string;
}

function SocialMediaLink({ icon, href }: SocialMediaLinkProps) {
  const theme = useTheme();

  return (
    <LinkButton
      icon={icon}
      minWidthToShowRegularLayout={theme.breakpoints.tablet}
      compactStyle={{
        color: theme.colors.primary,
        width: "4rem",
        height: "4rem",
        iconSize: "2rem",
      }}
      regularStyle={{
        color: theme.colors.primary,
        width: "4rem",
        height: "4rem",
        iconSize: "2.4rem",
      }}
      href={href}
    />
  );
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6rem;
  margin-top: 1rem;
  background: #d7dcc9;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 7rem;
    margin-top: 1.5rem;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <SocialMediaLinkList>
        <li>
          <SocialMediaLink icon={<Instagram />} href="#" />
        </li>
        <li>
          <SocialMediaLink icon={<Facebook />} href="#" />
        </li>
        <li>
          <SocialMediaLink icon={<Twitter />} href="#" />
        </li>
      </SocialMediaLinkList>
    </StyledFooter>
  );
}
