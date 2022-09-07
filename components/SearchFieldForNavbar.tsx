import React, { useCallback, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Button } from "components/Buttons";
import CloseIcon from "icons/close.svg";
import SearchIcon from "icons/search.svg";
import SearchField, { SearchFieldHandle } from "./SearchField";

// Sub-components
// =============================================================================

const SearchFieldForNavbarContainer = styled.div<{ width: string }>`
  position: relative;
  width: ${(props) => props.width};
  height: 100%;
  overflow: visible;
`;

const SearchFieldForNavbarContent = styled.div<{ showField: boolean }>`
  position: absolute;
  right: 0;
  display: flex;
  width: ${(props) => (props.showField ? "450px" : "100%")};
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: 3px solid ${(props) => (props.showField ? "#696868" : "none")};
    padding-left: ${(props) => (props.showField ? "1rem" : 0)};
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    width: 450px;
    border: none;
    padding: 0;
  }
`;

const SearchFieldContainer = styled.div<{ showField: boolean }>`
  display: ${(props) => (props.showField ? "flex" : "none")};
  align-items: center;
  width: 100%;
  height: 100%;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
  }
`;

interface SearchToggleProps {
  iconSizes: {
    mobile: string;
    tablet: string;
  };

  icon: any;
  buttonWidth: string;
  showField: boolean;
}

function SearchToggleButton({
  icon,
  iconSizes,
  buttonWidth,
  ...rest
}: SearchToggleProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const theme = useTheme();

  const commonButtonStyle = {
    hoverColor: theme.colors.textPrimaryHover,
    width: buttonWidth,
    height: "100%",
  };

  return (
    <Button
      icon={icon}
      compactStyle={{
        iconSize: iconSizes.mobile,
        ...commonButtonStyle,
      }}
      regularStyle={{
        iconSize: iconSizes.tablet,
        ...commonButtonStyle,
      }}
      minWidthToShowRegularLayout={theme.breakpoints.tablet}
      {...rest}
    />
  );
}

const OpenButtonContainer = styled.div<{ showField: boolean }>`
  display: ${(props) => (props.showField ? "none" : "block")};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
    height: 100%;
  }
`;

const CloseButtonContainer = styled.div<{ showField: boolean }>`
  display: ${(props) => (props.showField ? "block" : "none")};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
    height: 100%;
  }
`;

interface SearchFieldForNavbarProps {
  iconSizes: {
    mobile: string;
    tablet: string;
  };

  buttonWidth: string;
}

// Main component
// =============================================================================

/**
 * On desktop, the search field is always shown. On tablet, a button to open the
 * search is shown. When open, the seach may cover other parts of the navbar. On
 * mobile, the search fills up the entire width of the viewport.
 *
 * The container has the width of a navbar button, which the search field
 * overflows. This way, the surrounding layout is not affected at all on tablet
 * and below when the search is opened.
 * */
export default function SearchFieldForNavbar({
  iconSizes,
  buttonWidth,
}: SearchFieldForNavbarProps) {
  // Doesn't affect the desktop layout because the search is always shown
  const [showField, setShowField] = useState(false);

  const theme = useTheme();

  const searchFielForNavbarContainerRef = useRef<HTMLDivElement>(null);
  const searchFielForNavbarContentRef = useRef<HTMLDivElement>(null);
  const searchFielContainerdRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<SearchFieldHandle>(null);

  // On mobile, position and rezise the search using a window rezise event
  // handler so no structural changes in the navbar are needed and the
  // component can stay completely independent.

  const resetMobileStyle = useCallback(() => {
    const content = searchFielForNavbarContentRef.current;

    if (content) {
      content.style.right = "";
      content.style.width = "";
    }
  }, []);

  const setMobileStyle = useCallback(() => {
    const tabletBreakpoint = theme.breakpoints.tablet;
    const tabletBreakpointNumber = +tabletBreakpoint.slice(
      0,
      tabletBreakpoint.length - 2
    );

    if (window.innerWidth > tabletBreakpointNumber) {
      resetMobileStyle();
      return;
    }

    const container = searchFielForNavbarContainerRef.current;
    const content = searchFielForNavbarContentRef.current;

    if (!container || !content) return;

    const containerRect = container.getBoundingClientRect();
    const pagePadding = theme.pageWidths.mobile.padding;
    const bodyWidth = document.body.clientWidth;

    const offsetFromRight = bodyWidth - containerRect.right;
    const newRight = `calc(${-offsetFromRight}px + ${pagePadding})`;

    content.style.right = newRight;
    content.style.width = `calc(${bodyWidth}px - ${pagePadding})`;
  }, [
    resetMobileStyle,
    theme.breakpoints.tablet,
    theme.pageWidths.mobile.padding,
  ]);

  const open = () => {
    if (!searchFielContainerdRef.current || !searchFieldRef.current) return;

    setShowField(true);
    searchFielContainerdRef.current.style.display = "flex";
    searchFieldRef.current.focus();

    setMobileStyle();
    window.addEventListener("resize", setMobileStyle);
  };

  const close = () => {
    setShowField(false);

    const searchFieldContainer = searchFielContainerdRef.current;
    if (searchFieldContainer) searchFieldContainer.style.display = "";

    resetMobileStyle();
    window.removeEventListener("resize", setMobileStyle);
  };

  const onBlur = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    close();
  };

  return (
    <SearchFieldForNavbarContainer
      width={buttonWidth}
      ref={searchFielForNavbarContainerRef}
    >
      <SearchFieldForNavbarContent
        showField={showField}
        ref={searchFielForNavbarContentRef}
      >
        <SearchFieldContainer
          ref={searchFielContainerdRef}
          showField={showField}
        >
          <SearchField
            searchStyle="navbar"
            onBlur={onBlur}
            ref={searchFieldRef}
          />
        </SearchFieldContainer>
        <OpenButtonContainer showField={showField}>
          <SearchToggleButton
            showField={showField}
            icon={<SearchIcon />}
            iconSizes={iconSizes}
            buttonWidth={buttonWidth}
            onClick={open}
          />
        </OpenButtonContainer>
        <CloseButtonContainer showField={showField}>
          <SearchToggleButton
            showField={showField}
            icon={<CloseIcon />}
            iconSizes={iconSizes}
            buttonWidth={buttonWidth}
            onClick={close}
          />
        </CloseButtonContainer>
      </SearchFieldForNavbarContent>
    </SearchFieldForNavbarContainer>
  );
}
