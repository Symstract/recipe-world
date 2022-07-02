import styled from "styled-components";

const SectionContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: calc(
    ${({ theme }) => theme.pageWidths.desktop.maxWidth} +
      ${({ theme }) => theme.pageWidths.tablet.padding} * 2
  );
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.pageWidths.mobile.padding};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.pageWidths.tablet.padding};
  }
`;

export default SectionContainer;
