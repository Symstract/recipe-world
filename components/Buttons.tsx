import { forwardRef } from "react";
import styled, { css } from "styled-components";

// Common props and styles
// =============================================================================

export interface ButtonStyle {
  width?: string;
  height?: string;
  gap?: string;
  padding?: string;
  color?: string;
  hoverColor?: string;
  fontSize?: string;
  iconSize?: string;
}

interface CommonButtonProps {
  label?: string;
  icon?: any;
  /**
   * Minimum width at which to show the regular layout which displays also the
   * label if that's given (instead of only the icon).
   */
  minWidthToShowRegularLayout?: string;
  /** Style for the button when both an icon and a label are shown. */
  regularStyle?: ButtonStyle;
  /** Style for the button when only an icon is shown. */
  compactStyle?: ButtonStyle;
}

const style = css<CommonButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.compactStyle?.gap || "initial"};
  flex-shrink: 0;
  flex-grow: 0;
  width: ${(props) => props.compactStyle?.width || "initial"};
  height: ${(props) => props.compactStyle?.height || "initial"};
  padding: ${(props) => props.compactStyle?.padding || 0};
  background: none;
  border: none;
  font-size: ${(props) => props.compactStyle?.fontSize || "unset"};
  text-decoration: none;
  cursor: pointer;

  svg {
    width: ${(props) => props.compactStyle?.iconSize || "initial"};
    height: ${(props) => props.compactStyle?.iconSize || "initial"};
  }

  svg *:not([fill="none"]) {
    fill: ${(props) =>
      props.compactStyle?.color || props.theme.colors.textPrimary};
  }

  span {
    display: none;
  }

  &:disabled,
  &[aria-disabled="true"] {
    opacity: ${({ theme }) => theme.inputDisabledOpacity};
    cursor: default;
  }

  ${(props) =>
    props.compactStyle?.hoverColor &&
    css`
      &:hover {
        svg *:not([fill="none"]) {
          fill: ${(props) => props.compactStyle.hoverColor};
        }
      }
    `}

  @media screen and (min-width: ${(props) =>
    props.minWidthToShowRegularLayout || "0px"}) {
    gap: ${(props) => props.regularStyle?.gap || "initial"};
    width: ${(props) => props.regularStyle?.width || "initial"};
    height: ${(props) => props.regularStyle?.height || "initial"};
    padding: ${(props) => props.regularStyle?.padding || 0};
    font-size: ${(props) => props.regularStyle?.fontSize || "unset"};

    svg {
      width: ${(props) => props.regularStyle?.iconSize || "initial"};
      height: ${(props) => props.regularStyle?.iconSize || "initial"};
    }

    svg *:not([fill="none"]) {
      fill: ${(props) =>
        props.regularStyle?.color || props.theme.colors.textPrimary};
    }

    span {
      display: initial;
      color: ${(props) => props.regularStyle?.color || "unset"};
    }

    ${(props) =>
      props.regularStyle?.hoverColor &&
      css`
        &:hover {
          svg *:not([fill="none"]) {
            fill: ${(props) => props.compactStyle.hoverColor};
          }

          span {
            display: initial;
            color: ${(props) => props.regularStyle.hoverColor};
          }
        }
      `}
  }
`;

// Button
// =============================================================================

type ButtonProps = CommonButtonProps & React.HTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<ButtonProps>`
  ${style}
`;

export function Button({ label, icon, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest}>
      {icon}
      <span>{label}</span>
    </StyledButton>
  );
}

// LinkButton
// =============================================================================

type LinkButtonProps = CommonButtonProps &
  React.HTMLAttributes<HTMLAnchorElement>;

const StyledLinkButton = styled.a<LinkButtonProps>`
  ${style}
`;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function linkButton({ label, icon, ...rest }, ref) {
    return (
      <StyledLinkButton ref={ref} {...rest}>
        {icon}
        <span>{label}</span>
      </StyledLinkButton>
    );
  }
);
