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
import { useRouter } from "next/router";

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
  suggestionId: number;
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
    searchPhrase,
    highlightedIndex,
    setHighlightedIndex,
    setSuggestions,
    suggestions,
  } = props;

  // Intial test data
  const suggestions_: ISearchSuggestion[] = useMemo(() => {
    return [
      { suggestionId: 715424, suggestionPhrase: "dgdfdfg" },
      { suggestionId: 715423, suggestionPhrase: "dgdfdfg sdfwe" },
      { suggestionId: 715422, suggestionPhrase: "dgdfdfg er5yfbg" },
      { suggestionId: 715421, suggestionPhrase: "dgdfdfg sdae sdfsf" },
    ];
  }, []);

  useEffect(() => {
    // Fetch suggestions here
    setSuggestions(suggestions_);
  }, [searchPhrase, setSuggestions, suggestions_]);

  const router = useRouter();
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

  const handleClick = (id: number) => router.push(`/recipes/${id}`);
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
            onPointerDown={(e: React.PointerEvent) => e.preventDefault()}
            onClick={(e: React.MouseEvent) => handleClick(su.suggestionId)}
            searchStyle={searchStyle}
            suggestionId={su.suggestionId}
            suggestionPhrase={su.suggestionPhrase}
            isHighlighted={index === highlightedIndex}
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
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const [nonAutocompletedInputValue, setNonAutocompletedInputValue] =
      useState<string>("");
    const [suggestions, setSuggestions] = useState<ISearchSuggestion[]>([]);
    const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] =
      useState<number | null>(null);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<
      number | null
    >(null);

    let finalInputValue;

    if (selectedSuggestionIndex !== null) {
      finalInputValue = suggestions[selectedSuggestionIndex].suggestionPhrase;
    } else {
      finalInputValue = nonAutocompletedInputValue;
    }

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
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
      setSelectedSuggestionIndex(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNonAutocompletedInputValue(e.target.value);
      setHighlightedSuggestionIndex(null);
      setSelectedSuggestionIndex(null);
    };

    const selectNextSuggestion = () => {
      if (highlightedSuggestionIndex === null) {
        setHighlightedSuggestionIndex(0);
        setSelectedSuggestionIndex(0);
        return;
      }

      if (highlightedSuggestionIndex === suggestions.length - 1) {
        setHighlightedSuggestionIndex(null);
        setSelectedSuggestionIndex(null);
        return;
      }

      setHighlightedSuggestionIndex(highlightedSuggestionIndex + 1);
      setSelectedSuggestionIndex(highlightedSuggestionIndex + 1);
    };

    const selectPreviousSuggestion = () => {
      if (highlightedSuggestionIndex === null) {
        setHighlightedSuggestionIndex(suggestions.length - 1);
        setSelectedSuggestionIndex(suggestions.length - 1);
        return;
      }

      if (highlightedSuggestionIndex === 0) {
        setHighlightedSuggestionIndex(null);
        setSelectedSuggestionIndex(null);
        return;
      }

      setHighlightedSuggestionIndex(highlightedSuggestionIndex - 1);
      setSelectedSuggestionIndex(highlightedSuggestionIndex - 1);
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

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!nonAutocompletedInputValue) {
        return;
      }

      if (selectedSuggestionIndex !== null) {
        router.push(
          `/recipes/${suggestions[selectedSuggestionIndex].suggestionId}`
        );
        return;
      }

      router.push(
        {
          pathname: "/recipes",
          query: { query: nonAutocompletedInputValue },
        },
        undefined,
        { shallow: true }
      );
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
        onSubmit={handleSubmit}
        onBlur={onBlur}
      >
        <SearchInput
          value={finalInputValue}
          searchStyle={searchStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        <SearchButtonContainer searchStyle={searchStyle}>
          <Button
            type="submit"
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
