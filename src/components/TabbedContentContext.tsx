import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type TabbedContentContextState = {
  tabs: Tab[];
  upsertTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
  activeContentIdx?: number;
};

const TabbedContentContext = createContext<
  TabbedContentContextState | undefined
>(undefined);

export type Tab = {
  id: string;
  header: ReactNode;
  content: ReactNode;
  isActive?: boolean;
};

type TabbedContentContextProviderProps = PropsWithChildren<{}>;

export function TabbedContentContextProvider(
  props: TabbedContentContextProviderProps
) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const upsertTab = useCallback((tab: Tab) => {
    setTabs((tabs) => {
      let shouldInsert = true;
      const updatedTabs = [];
      tabs.forEach((t, i) => {
        if (t.id === tab.id) {
          updatedTabs.push(tab);
          shouldInsert = false;
        } else {
          // if the new/updated tab is active, deactivate all other tabs
          if (tab.isActive) {
            t.isActive = false;
          }
          updatedTabs.push(t);
        }
      });

      if (shouldInsert) {
        updatedTabs.push(tab);
      }
      return updatedTabs;
    });
  }, []);

  const removeTab = useCallback((tab: Tab) => {
    setTabs((tabs) =>
      tabs.filter((t, i) => {
        return t.id !== tab.id;
      })
    );
  }, []);

  const activeContentIdx = useMemo(() => {
    // Use the earliest tab where tab.isActive === true
    return tabs.findIndex((tab) => tab.isActive);
  }, [tabs]);

  return (
    <TabbedContentContext.Provider
      value={{ tabs, upsertTab, removeTab, activeContentIdx }}
    >
      {props.children}
    </TabbedContentContext.Provider>
  );
}

export function useTabbedContentContext() {
  const context = useContext(TabbedContentContext);
  if (context === undefined) {
    throw new Error(
      "useTabbedContentContext must be used within a TabbedContentContextProvider"
    );
  }
  return context;
}
