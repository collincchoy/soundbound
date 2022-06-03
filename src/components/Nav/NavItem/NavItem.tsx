import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useMatch } from "react-router-dom";
import styles from "./NavItem.module.scss";

const SubMenuNavLink = styled(NavLink)`
  &:hover {
    font-weight: bold;
  }
`;

const DropdownMenu = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: calc(50% + 15px);
  left: 0.75rem; /*padding from navbar-item*/
  display: none;
  font-size: 0.7em;
  min-width: max-content;
  z-index: 100;

  a {
    color: white;
  }

  ${(props) =>
    props.isActive &&
    `
    display: inline-block;
  `}
`;

export type NavItemProps = {
  name: string;
  linkTo: string;
  subMenuItems?: {
    name: string;
    linkTo: string;
  }[];
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 75px;
`;

const NavItem: React.FC<NavItemProps> = ({ name, linkTo, subMenuItems }) => {
  const [isHoveredOver, setIsHoveredOver] = useState(false);
  const currentRouteMatchesLinkTo = useMatch(linkTo);
  return (
    <div
      className={`navbar-item ${subMenuItems && "has-dropdown is-hoverable"}`}
      onMouseOver={() => subMenuItems && setIsHoveredOver(true)}
      onMouseLeave={() => subMenuItems && setIsHoveredOver(false)}
    >
      <ItemWrapper>
        <NavLink
          className={({ isActive }) =>
            `${styles.underline_onhover} navbar-link is-arrowless ${
              isActive ? "is-active" : ""
            }`
          }
          to={linkTo}
        >
          {name}
        </NavLink>

        {subMenuItems && (
          <DropdownMenu isActive={isHoveredOver || !!currentRouteMatchesLinkTo}>
            {subMenuItems
              ?.map<React.ReactNode>((item) => {
                return (
                  <SubMenuNavLink
                    // activeClassName="is-active"
                    className={({ isActive }) => (isActive ? "is-active" : "")}
                    to={item.linkTo}
                    key={item.name}
                  >
                    {item.name}
                  </SubMenuNavLink>
                );
              })
              .reduce((prev, next) => {
                return [prev, <span key="span"> | </span>, next];
              })}
          </DropdownMenu>
        )}
      </ItemWrapper>
    </div>
  );
};

export default NavItem;
