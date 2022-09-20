import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import axios from "axios";
import styled, { css, useTheme } from "styled-components";
import { useRouter } from "next/router";

import { addOpacityToHexColor } from "lib/colorUtils";
import { Button, ButtonStyle } from "components/Buttons";
import { RecipeSearchSuggestion } from "lib/recipeTypes";
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
  padding-left: ${({ theme }) => theme.pageWidths.mobile.padding};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 0;
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
  display: ${(props) => (props.searchStyle === "navbar" ? "none" : "block")};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

interface SearchProps {
  searchStyle: SearchStyle;
  hasFocus: boolean;
}

const searchFormBorderBottomWidth = "2px";

const searchFormBorderBottomStyle = css<SearchProps>`
  border-bottom: ${searchFormBorderBottomWidth} solid
    ${(props) =>
      props.hasFocus
        ? props.theme.colors.textPrimary
        : addOpacityToHexColor(
            props.theme.colors.textPrimary,
            props.theme.inputInactiveOpacity
          )};
`;

const searchFormStyleRegular = css<SearchProps>`
  position: relative;
  display: flex;
  width: 100%;
  max-width: 700px;
  ${searchFormBorderBottomStyle}
  line-height: 1em;
`;

const searchFormStyleNavbar = css<SearchProps>`
  border-bottom: none;
  height: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${searchFormBorderBottomStyle}
    height: initial;
  }
`;

const SearchForm = styled.form<SearchProps>`
  ${searchFormStyleRegular}
  ${(props) => props.searchStyle === "navbar" && searchFormStyleNavbar};
`;

// === Search suggestions ===

interface SearchSuggestionProps
  extends RecipeSearchSuggestion,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  searchStyle: SearchStyle;
  searchPhrase: string;
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
  const { searchPhrase, suggestionName } = props;

  let label;

  if (suggestionName.startsWith(searchPhrase.toLowerCase())) {
    const bolded = suggestionName.slice(0, searchPhrase.length);
    const regular = suggestionName.slice(searchPhrase.length);
    label = (
      <>
        <b>{bolded}</b>
        {regular}
      </>
    );
  } else {
    label = suggestionName;
  }

  return <StyledSearchSuggestion {...props}>{label}</StyledSearchSuggestion>;
}

interface SearchSuggestionListProps {
  searchStyle: SearchStyle;
  searchPhrase: string;
  suggestions: RecipeSearchSuggestion[];
  setSuggestions: React.Dispatch<
    React.SetStateAction<RecipeSearchSuggestion[]>
  >;
  highlightedIndex: number | null;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  formRef: React.RefObject<HTMLFormElement>;
}

const StyledSearchSuggestionList = styled.ul<SearchSuggestionListProps>`
  position: absolute;
  top: 100%;
  transform: translateY(
    ${(props) =>
      props.searchStyle === "regular" ? searchFormBorderBottomWidth : 0}
  );
  width: ${(props) => (props.searchStyle === "regular" ? "100%" : "100vw")};
  z-index: ${(props) => (props.searchStyle === "regular" ? 2 : 20)};
  border: ${(props) =>
    props.searchStyle === "regular"
      ? css`1px solid ${props.theme.colors.textSecondary}`
      : "none"};
  border-top: ${(props) =>
    props.searchStyle === "regular"
      ? "none"
      : css`1px solid ${props.theme.colors.textSecondary}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    transform: translateY(${searchFormBorderBottomWidth});
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-top: none;
  }
`;

function SearchSuggestionList(props: SearchSuggestionListProps) {
  const {
    searchStyle,
    searchPhrase,
    highlightedIndex,
    setHighlightedIndex,
    setSuggestions,
    suggestions,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previousFetchSearchPhrase, setPreviousFetchSearchPhrase] =
    useState<string>("");

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    setPreviousFetchSearchPhrase(searchPhrase);

    const res = await axios("/api/search-suggestions", {
      params: { query: searchPhrase },
    });
    const resData = await res.data;

    if (!resData.data) {
      setSuggestions([]);
      return;
    }

    setSuggestions(resData.data);
    setIsLoading(false);
  }, [searchPhrase, setSuggestions]);

  useEffect(() => {
    if (isLoading || searchPhrase === previousFetchSearchPhrase) return;

    if (!searchPhrase) {
      setSuggestions([]);
      return;
    }

    fetchSuggestions();
  }, [
    fetchSuggestions,
    isLoading,
    previousFetchSearchPhrase,
    searchPhrase,
    setSuggestions,
    suggestions,
  ]);

  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);

  if (!suggestions.length) return null;

  const handleClick = (id: number) => router.push(`/recipes/${id}`);
  const handlePointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const items = Array.from(e.currentTarget.parentElement!.children);
    const index = items.findIndex((elem) => elem === e.currentTarget);
    setHighlightedIndex(index === -1 ? null : index);
  };

  const handlePointerLeave = () => {
    setHighlightedIndex(null);
  };

  return (
    <StyledSearchSuggestionList ref={listRef} {...props}>
      {suggestions.map((su, index) => (
        <li
          key={su.suggestionId}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <SearchSuggestion
            onPointerDown={(e: React.PointerEvent) => e.preventDefault()}
            onClick={() => handleClick(su.suggestionId)}
            searchStyle={searchStyle}
            searchPhrase={searchPhrase}
            suggestionId={su.suggestionId}
            suggestionName={su.suggestionName}
            isHighlighted={index === highlightedIndex}
          />
        </li>
      ))}
    </StyledSearchSuggestionList>
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
    const [suggestions, setSuggestions] = useState<RecipeSearchSuggestion[]>(
      []
    );
    const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] =
      useState<number | null>(null);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<
      number | null
    >(null);

    let finalInputValue;

    if (selectedSuggestionIndex !== null) {
      finalInputValue = suggestions[selectedSuggestionIndex].suggestionName;
    } else {
      finalInputValue = nonAutocompletedInputValue;
    }

    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    useEffect(() => {
      if (searchStyle === "navbar") setNonAutocompletedInputValue("");
    }, [router, searchStyle]);

    useEffect(() => {
      const query = router.query.query;

      if (
        searchStyle !== "regular" ||
        !router.pathname.startsWith("/recipes")
      ) {
        return;
      }

      if (query) {
        setNonAutocompletedInputValue(Array.isArray(query) ? query[0] : query);
      } else {
        setNonAutocompletedInputValue("");
      }
    }, [router, searchStyle]);

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
