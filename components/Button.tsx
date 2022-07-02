import styled from "styled-components";

export interface ButtonStyle {
  width?: string;
  height?: string;
  gap?: string;
  padding?: string;
  bottomBorderWidth?: string;
  color?: string;
  fontSize?: string;
  iconSize?: string;
}

interface ButtonProps {
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
  as?: "a" | "button";
  href?: string;
  onClick?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

const StyledButton = styled.button<ButtonProps>`
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
  border-color: ${(props) => props.compactStyle?.color || "unset"};
  border-bottom-width: ${(props) => props.compactStyle?.bottomBorderWidth || 0};
  border-bottom-style: solid;
  font-size: ${(props) => props.compactStyle?.fontSize || "unset"};
  text-decoration: none;
  cursor: pointer;

  svg {
    width: ${(props) => props.compactStyle?.iconSize || "initial"};
    height: ${(props) => props.compactStyle?.iconSize || "initial"};
  }

  svg *:not([fill="none"]) {
    fill: ${(props) => props.compactStyle?.color || "initial"};
  }

  span {
    display: none;
  }

  @media screen and (min-width: ${(props) =>
      props.minWidthToShowRegularLayout || "0px"}) {
    gap: ${(props) => props.regularStyle?.gap || "initial"};
    width: ${(props) => props.regularStyle?.width || "initial"};
    height: ${(props) => props.regularStyle?.height || "initial"};
    padding: ${(props) => props.regularStyle?.padding || 0};
    border-color: ${(props) => props.regularStyle?.color || "unset"};
    border-bottom-width: ${(props) =>
      props.regularStyle?.bottomBorderWidth || 0};
    font-size: ${(props) => props.regularStyle?.fontSize || "unset"};

    svg {
      width: ${(props) => props.regularStyle?.iconSize || "initial"};
      height: ${(props) => props.regularStyle?.iconSize || "initial"};
    }

    svg *:not([fill="none"]) {
      fill: ${(props) => props.regularStyle?.color || "initial"};
    }

    span {
      display: initial;
      color: ${(props) => props.regularStyle?.color || "unset"};
    }
  }
`;

export default function Button({ label, icon, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest}>
      {icon}
      <span>{label}</span>
    </StyledButton>
  );
}
