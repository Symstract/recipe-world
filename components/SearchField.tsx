import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled, { css, useTheme } from "styled-components";

import { addOpacityToHexColor } from "lib/colorUtils";
import { Button, ButtonStyle } from "components/Buttons";
import SearchIcon from "icons/search.svg";

type SearchStyle = "regular" | "navbar";

interface SearchInputProps {
  searchStyle: SearchStyle;
}

const searchInputStyleRegular = css<SearchInputProps>`
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

const searchInputStyleNavbar = css<SearchInputProps>`
  font-size: inherit;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: ${({ theme }) => theme.pageWidths.mobile.padding};
  }
`;

const SearchInput = styled.input.attrs<SearchInputProps>({
  type: "search",
  placeholder: "Search recipes",
})`
  ${searchInputStyleRegular}
  ${(props) => props.searchStyle === "navbar" && searchInputStyleNavbar};
`;

const SearchButtonContainer = styled.div<{ searchStyle: SearchStyle }>`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${(props) => (props.searchStyle === "navbar" ? "none" : "block")};
  }
`;

interface SearchProps {
  searchStyle: SearchStyle;
  hasFocus: boolean;
}

const searchFormStyleRegular = css<SearchProps>`
  display: flex;
  width: 100%;
  max-width: 700px;
  border-bottom: 2px solid
    ${(props) =>
      props.hasFocus
        ? props.theme.colors.textPrimary
        : addOpacityToHexColor(
            props.theme.colors.textPrimary,
            props.theme.inputInactiveOpacity
          )};
  line-height: 1em;
`;

const searchFormStyleNavbar = css<SearchProps>`
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-bottom: none;
    height: 100%;
  }
`;

const SearchForm = styled.form<SearchProps>`
  ${searchFormStyleRegular}
  ${(props) => props.searchStyle === "navbar" && searchFormStyleNavbar};
`;

interface SearchFieldProps {
  searchStyle?: SearchStyle;
  onBlur?: (e: React.FocusEvent) => void;
}

export type SearchFieldHandle = {
  focus: () => void;
};

const SearchField = forwardRef<SearchFieldHandle, SearchFieldProps>(
  function SearchFieldToForward({ searchStyle = "regular", onBlur }, ref) {
    const [hasFocus, setHasFocus] = useState(false);
    const [hasInput, setHasInput] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef?.current) inputRef.current.focus();
      },
    }));

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
      <SearchForm
        hasFocus={hasFocus}
        searchStyle={searchStyle}
        ref={formRef}
        onBlur={onBlur}
      >
        <SearchInput
          searchStyle={searchStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onInput={handleInput}
          ref={inputRef}
        />
        <SearchButtonContainer searchStyle={searchStyle}>
          <Button
            icon={<SearchIcon />}
            minWidthToShowRegularLayout={theme.breakpoints.tablet}
            compactStyle={{ iconSize: "2.4rem", ...commonStyle }}
            regularStyle={{ iconSize: "2.8rem", ...commonStyle }}
            aria-disabled={!hasInput}
          />
        </SearchButtonContainer>
      </SearchForm>
    );
  }
);

export default SearchField;
