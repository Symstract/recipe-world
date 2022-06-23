import styled from "styled-components";

import SectionContainer from "./SectionContainer";

const LogoPlaceholder = styled.div`
  width: 17.5rem;
  height: 4rem;
  background: ${({ theme }) => theme.colors.primary};
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

function Nav() {
  return <StyledNav></StyledNav>;
}

const StyledHeader = styled.header`
  width: 100%;
  height: 6.6rem;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export default function Header() {
  return (
    <StyledHeader>
      <SectionContainer></SectionContainer>
    </StyledHeader>
  );
}
