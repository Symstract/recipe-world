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
  hoverIcon?: any;
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
  font-size: ${(props) => props.compactStyle?.fontSize || "unset"};
  text-decoration: none;

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
    props.hoverIcon &&
    css`
      svg:last-of-type {
        display: none;
      }

      &:hover {
        svg:first-of-type {
          display: none;
        }
        svg:last-of-type {
          display: initial;
        }
      }
    `}

  ${(props) =>
    props.compactStyle?.hoverColor &&
    css`
      &:not(:disabled):not([aria-disabled="true"]):hover {
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
        &:not(:disabled):not([aria-disabled="true"]):hover {
          svg *:not([fill="none"]) {
            fill: ${(props) => props.regularStyle.hoverColor};
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

type ButtonProps = CommonButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<ButtonProps>`
  ${style}
`;

export function Button(props: ButtonProps) {
  const { label, icon, hoverIcon } = props;

  return (
    <StyledButton {...props}>
      {icon}
      {hoverIcon}
      <span>{label}</span>
    </StyledButton>
  );
}

// LinkButton
// =============================================================================

type LinkButtonProps = CommonButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const StyledLinkButton = styled.a<LinkButtonProps>`
  ${style}
`;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function linkButton(props, ref) {
    const { label, icon, hoverIcon } = props;

    return (
      <StyledLinkButton ref={ref} {...props}>
        {icon}
        {hoverIcon}
        <span>{label}</span>
      </StyledLinkButton>
    );
  }
);
