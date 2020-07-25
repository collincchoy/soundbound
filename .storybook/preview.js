import React from "react";
import "_variables.scss";
import "index.scss";
import { addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router";

addDecorator((story) => (
  <MemoryRouter initialEntries={["/"]} initialIndex={0}>
    {story()}
  </MemoryRouter>
));
