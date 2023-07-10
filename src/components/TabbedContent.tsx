import React, { ReactNode, useMemo } from "react";
import TabHeader from "./Tab";
import {
  TabbedContentContextProvider,
  useTabbedContentContext,
} from "./TabbedContentContext";

export default function TabbedContent(props: { children: ReactNode }) {
  return (
    <TabbedContentContextProvider>
      {props.children}

      <RenderedTabbedContent />
    </TabbedContentContextProvider>
  );
}

function RenderedTabbedContent() {
  const { tabs, activeIdx } = useTabbedContentContext();
  const activeTabContent = activeIdx !== undefined && tabs[activeIdx]?.content;

  return (
    <>
      <div className="tabs is-boxed">
        <ul>
          {tabs.map((tab, i) => {
            const isActive = activeIdx === i;
            return (
              <li key={i} className={isActive ? "is-active" : ""}>
                <a>{tab.header}</a>
              </li>
            );
          })}
        </ul>
      </div>

      {activeTabContent && activeTabContent}
    </>
  );
}
