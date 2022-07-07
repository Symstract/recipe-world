import styled from "styled-components";

const PageHeadingBlock = styled.div`
  padding: 8px 28px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
  transform: rotate(-3deg);

  h1 {
    color: white;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 10px 40px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 12px 50px;
  }
`;

export default PageHeadingBlock;
