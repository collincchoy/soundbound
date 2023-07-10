import React, { ReactNode, useEffect } from "react";
import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import { useTabbedContentContext } from "./TabbedContentContext";

type Props = {
  id: string;
  isActive?: boolean;
  children: ReactNode;
};

export default function Tab({ id, isActive, children }: Props) {
  let header: ReactNode, content: ReactNode;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === TabHeader) {
      header = child;
    } else if (child.type === TabContent) {
      content = child;
    } else {
      // content.push(child);
    }
  });
  const { upsertTab, removeTab } = useTabbedContentContext();
  useEffect(() => {
    const tab = { id, header, content, isActive };
    upsertTab(tab);
    return () => removeTab(tab);
  }, [id, header, content, isActive, upsertTab, removeTab]);
  return null;
}
