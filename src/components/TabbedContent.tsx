import React, { PropsWithChildren } from "react";
import {
  Tab,
  TabbedContentContextProvider,
  useTabbedContentContext,
} from "./TabbedContentContext";

type Props = {
  onTabClick?: (tab: Tab, i: number) => void;
};

export default function TabbedContent(props: PropsWithChildren<Props>) {
  return (
    <TabbedContentContextProvider>
      {props.children}

      <RenderedTabbedContent {...props} />
    </TabbedContentContextProvider>
  );
}

function RenderedTabbedContent(props: Props) {
  const { tabs, activeContentIdx } = useTabbedContentContext();
  const activeTabContent =
    activeContentIdx !== undefined && tabs[activeContentIdx]?.content;

  function handleTabClick(tab: Tab, i: number) {
    props.onTabClick && props.onTabClick(tab, i);
  }

  return (
    <>
      <div className="tabs is-boxed">
        <ul>
          {tabs.map((tab, i) => {
            const isActive = activeContentIdx === i;
            return (
              <li key={i} className={isActive ? "is-active" : ""}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- bulma tab styles target anchor tags*/}
                <a onClick={() => handleTabClick(tab, i)}>{tab.header}</a>
              </li>
            );
          })}
        </ul>
      </div>

      {activeTabContent && activeTabContent}
    </>
  );
}
