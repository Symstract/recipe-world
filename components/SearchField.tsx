import { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Button, ButtonStyle } from "components/Buttons";
import SearchIcon from "icons/search.svg";
import { addOpacityToHexColor } from "lib/colorUtils";

const SearchInput = styled.input.attrs({
  type: "search",
  placeholder: "Search recipes",
})`
  width: 100%;
  border: none;
  background: none;
  font-size: 2rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) =>
      addOpacityToHexColor(
        theme.colors.textPrimary,
        theme.inputInactiveOpacity
      )};
  }
`;

const StyledSearch = styled.form<{ hasFocus: boolean }>`
  display: flex;
  width: 100%;
  max-width: 700px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) =>
    props.hasFocus
      ? props.theme.colors.textPrimary
      : addOpacityToHexColor(
          props.theme.colors.textPrimary,
          props.theme.inputInactiveOpacity
        )};
  line-height: 1em;
`;

export default function SearchField() {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleBlur = () => {
    setHasFocus(false);
  };

  const handleInput = () => {
    setHasInput(!!inputRef.current?.value.length);
  };

  const commonStyle: ButtonStyle = {
    width: "4rem",
    height: "4rem",
    hoverColor: theme.colors.textPrimaryHover,
  };

  return (
    <StyledSearch hasFocus={hasFocus}>
      <SearchInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onInput={handleInput}
      />
      <Button
        icon={<SearchIcon />}
        minWidthToShowRegularLayout={theme.breakpoints.tablet}
        compactStyle={{ iconSize: "2.4rem", ...commonStyle }}
        regularStyle={{ iconSize: "2.8rem", ...commonStyle }}
        aria-disabled={!hasInput}
      />
    </StyledSearch>
  );
}
