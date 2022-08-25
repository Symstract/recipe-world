import styled, { keyframes } from "styled-components";

import SpinnerIcon from "icons/spinner.svg";

const spinnerRotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(SpinnerIcon)`
  animation: ${spinnerRotation} 1s linear infinite;
  width: 3rem;
  height: 3rem;

  *:not([fill="none"]) {
    fill: ${({ theme }) => theme.colors.textSecondary};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 4rem;
    height: 4rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 5rem;
    height: 5rem;
  }
`;

export default Spinner;
