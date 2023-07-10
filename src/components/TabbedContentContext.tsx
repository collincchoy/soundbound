import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
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

type Action = { type: "removeTab" } | { type: "removeTab" };
type Dispatch = (action: Action) => void;
type State = TabbedContentContextState;

export type Tab = {
  id: string;
  header: ReactNode;
  content: ReactNode;
  isActive?: boolean;
};

// function TabbedContentReducer(state: State, action: Action) {
//   switch (action.type) {
//     case "removeTab": {
//       return { count: state.count + 1 };
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

type TabbedContentContextProviderProps = PropsWithChildren<{}>;

export function TabbedContentContextProvider(
  props: TabbedContentContextProviderProps
) {
  // const [state, dispatch] = useReducer(TabbedContentReducer, {tabs: []});
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
