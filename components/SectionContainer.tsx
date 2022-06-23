import styled from "styled-components";

const SectionContainer = styled.div`
  margin: 0 auto;
  width: ${({ theme }) => theme.pageWidth};
  max-width: ${({ theme }) => theme.pageMaxWidth};
  height: 100%;
`;

export default SectionContainer;
