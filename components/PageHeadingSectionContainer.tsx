import styled from "styled-components";

const PageHeadingSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 16rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 22rem;
  }
`;

export default PageHeadingSectionContainer;
