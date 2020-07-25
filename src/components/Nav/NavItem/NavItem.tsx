import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNavLink = styled(NavLink).attrs((p) => ({
  className: "navbar-link is-arrowless",
}))`
  font-size: 1.2rem;
`;

const DropdownMenu = styled.div<{ isActive: boolean }>`
  position: absolute;
  /* top: 100%; */
  display: none;
  background-color: black;
  font-size: 0.75em;

  .navbar-item,
  .navbar-link {
    display: inline-block;
    position: static;
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

const NavItem: React.FC<NavItemProps> = ({ name, linkTo, subMenuItems }) => {
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  return (
    <div
      className={`navbar-item ${subMenuItems && "has-dropdown is-hoverable"}`}
      onMouseOver={() => subMenuItems && setSubmenuIsOpen(true)}
      onMouseLeave={() => subMenuItems && setSubmenuIsOpen(false)}
    >
      <StyledNavLink to={linkTo} activeClassName="is-active">
        {name}
      </StyledNavLink>

      {subMenuItems && (
        // <div className="navbar-dropdown">
        <DropdownMenu isActive={true}>
          {subMenuItems?.map((item) => {
            return (
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to={item.linkTo}
                key={item.name}
              >
                {item.name}
              </NavLink>
            );
          })}
        </DropdownMenu>
        // </div>
      )}
    </div>
  );
};

export default NavItem;
