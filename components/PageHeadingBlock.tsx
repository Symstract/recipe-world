import styled from "styled-components";

const PageHeadingBlock = styled.div`
  padding: 9px 28px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
  transform: rotate(-3deg);

  h1 {
    color: white;
    line-height: 1em;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 10px 40px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 12px 50px;

    h1 {
      font-size: 5.8rem;
    }
  }
`;

export default PageHeadingBlock;
