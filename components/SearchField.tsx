import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import styled, { css, useTheme } from "styled-components";

import { addOpacityToHexColor } from "lib/colorUtils";
import { Button, ButtonStyle } from "components/Buttons";
import SearchIcon from "icons/search.svg";

type SearchStyle = "regular" | "navbar";

// Sub-components
// =============================================================================

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

// === Search suggestions ===

interface ISearchSuggestion {
  suggestionId: string;
  suggestionPhrase: string;
}

interface SearchSuggestionProps
  extends ISearchSuggestion,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  searchStyle: SearchStyle;
  isHighlighted: boolean;
}

const StyledSearchSuggestion = styled.button<SearchSuggestionProps>`
  width: 100%;
  padding: 0.6rem ${({ theme }) => theme.pageWidths.mobile.padding};
  background: ${(props) =>
    props.isHighlighted ? props.theme.colors.surfaceHighlight : "none"};
  font-size: ${(props) =>
    props.searchStyle === "navbar" ? "inherit" : "2rem"};
  text-align: left;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0.6rem 1.2rem;
  }
`;

function SearchSuggestion(props: SearchSuggestionProps) {
  return (
    <StyledSearchSuggestion {...props}>
      {props.suggestionPhrase}
    </StyledSearchSuggestion>
  );
}

interface SearchSuggestionListProps {
  searchStyle: SearchStyle;
  searchPhrase: string;
  suggestions: ISearchSuggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<ISearchSuggestion[]>>;
  highlightedIndex: number | null;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  onClick: () => void;
  formRef: React.RefObject<HTMLFormElement>;
}

const StyledSearchSuggestionList = styled.ul`
  position: absolute;
  z-index: 999;
  border-top: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background: ${(props) => props.theme.colors.surface};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-top: none;
  }
`;

function SearchSuggestionList(props: SearchSuggestionListProps) {
  const {
    searchStyle,
    formRef,
    onClick,
    searchPhrase,
    highlightedIndex,
    setHighlightedIndex,
    setSuggestions,
    suggestions,
  } = props;

  // Intial test data
  const suggestions_: ISearchSuggestion[] = useMemo(() => {
    return [
      { suggestionId: "df3aef", suggestionPhrase: "dgdfdfg" },
      { suggestionId: "dfa", suggestionPhrase: "dgdfdfg sdfwe" },
      { suggestionId: "dffgncv", suggestionPhrase: "dgdfdfg er5yfbg" },
      { suggestionId: "4tdfgfg", suggestionPhrase: "dgdfdfg sdae sdfsf" },
    ];
  }, []);

  useEffect(() => {
    // Fetch suggestions here
    setSuggestions(suggestions_);
  }, [searchPhrase, setSuggestions, suggestions_]);

  const theme = useTheme();
  const listRef = useRef<HTMLUListElement>(null);

  const setStyle = useCallback(() => {
    if (!formRef.current || !listRef.current) return;

    const formRect = formRef.current.getBoundingClientRect();
    const tabletBreakpoint = +theme.breakpoints.tablet.slice(
      0,
      theme.breakpoints.tablet.length - 2
    );
    const listStyle = listRef.current.style;

    listStyle.top = formRect.bottom + "px";

    if (window.innerWidth < tabletBreakpoint) {
      listStyle.left = "0";
      listStyle.width = "100%";
    } else {
      listStyle.left = formRect.left + "px";
      listStyle.width = formRect.right - formRect.left + "px";
    }
  }, [formRef, theme.breakpoints.tablet]);

  useEffect(() => {
    setStyle();
    window.addEventListener("resize", setStyle);

    return () => window.removeEventListener("resize", setStyle);
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const items = Array.from(e.currentTarget.parentElement!.children);
    const index = items.findIndex((elem) => elem === e.currentTarget);
    setHighlightedIndex(index === -1 ? null : index);
  };

  const handlePointerLeave = () => {
    setHighlightedIndex(null);
  };

  const list = (
    <StyledSearchSuggestionList ref={listRef}>
      {suggestions_.map((su, index) => (
        <li
          key={su.suggestionId}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <SearchSuggestion
            searchStyle={searchStyle}
            suggestionId={su.suggestionId}
            suggestionPhrase={su.suggestionPhrase}
            isHighlighted={index === highlightedIndex}
            onClick={onClick}
          />
        </li>
      ))}
    </StyledSearchSuggestionList>
  );

  return ReactDOM.createPortal(
    list,
    document.getElementById("__next") as HTMLDivElement
  );
}

// Main component
// =============================================================================

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
    const [nonAutocompletedInputValue, setNonAutocompletedInputValue] =
      useState<string>("");
    const [suggestions, setSuggestions] = useState<ISearchSuggestion[]>([]);
    const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] =
      useState<number | null>(null);

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
      setHighlightedSuggestionIndex(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNonAutocompletedInputValue(e.target.value);
      setHighlightedSuggestionIndex(null);
    };

    const selectNextSuggestion = () => {
      if (highlightedSuggestionIndex === null) {
        setHighlightedSuggestionIndex(0);
        if (inputRef.current) {
          inputRef.current.value = suggestions[0].suggestionPhrase;
        }
        return;
      }

      if (highlightedSuggestionIndex === suggestions.length - 1) {
        setHighlightedSuggestionIndex(null);
        if (inputRef.current) {
          inputRef.current.value = nonAutocompletedInputValue;
        }
        return;
      }

      setHighlightedSuggestionIndex(highlightedSuggestionIndex + 1);
      if (inputRef.current) {
        inputRef.current.value =
          suggestions[highlightedSuggestionIndex + 1].suggestionPhrase;
      }
    };

    const selectPreviousSuggestion = () => {
      if (highlightedSuggestionIndex === null) {
        setHighlightedSuggestionIndex(suggestions.length - 1);
        if (inputRef.current) {
          inputRef.current.value =
            suggestions[suggestions.length - 1].suggestionPhrase;
        }

        return;
      }

      if (highlightedSuggestionIndex === 0) {
        setHighlightedSuggestionIndex(null);
        if (inputRef.current) {
          inputRef.current.value = nonAutocompletedInputValue;
        }
        return;
      }

      setHighlightedSuggestionIndex(highlightedSuggestionIndex - 1);
      if (inputRef.current) {
        inputRef.current.value =
          suggestions[highlightedSuggestionIndex - 1].suggestionPhrase;
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        selectPreviousSuggestion();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        selectNextSuggestion();
      }
    };

    const commonButtonStyle: ButtonStyle = {
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <SearchButtonContainer searchStyle={searchStyle}>
          <Button
            icon={<SearchIcon />}
            minWidthToShowRegularLayout={theme.breakpoints.tablet}
            compactStyle={{ iconSize: "2.4rem", ...commonButtonStyle }}
            regularStyle={{ iconSize: "2.8rem", ...commonButtonStyle }}
            aria-disabled={!nonAutocompletedInputValue}
          />
        </SearchButtonContainer>
        {nonAutocompletedInputValue && hasFocus && (
          <SearchSuggestionList
            searchStyle={searchStyle}
            formRef={formRef}
            searchPhrase={nonAutocompletedInputValue}
            onClick={() => {}}
            highlightedIndex={highlightedSuggestionIndex}
            setHighlightedIndex={setHighlightedSuggestionIndex}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        )}
      </SearchForm>
    );
  }
);

export default SearchField;
