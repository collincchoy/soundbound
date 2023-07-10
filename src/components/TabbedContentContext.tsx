import React, {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

const TabbedContentContext = createContext<
  TabbedContentContextState | undefined
>(undefined);

type Action = { type: "removeTab" } | { type: "removeTab" };
type Dispatch = (action: Action) => void;
type State = TabbedContentContextState;

type Tab = { id: string; header: ReactNode; content: ReactNode };

export type TabbedContentContextState = {
  tabs: Tab[];
  upsertTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
  activeIdx?: number;
  // setActiveIdx: (idx: number) => void;
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

export function TabbedContentContextProvider({
  children,
}: TabbedContentContextProviderProps) {
  // const [state, dispatch] = useReducer(TabbedContentReducer, {tabs: []});
  const [tabs, setTabs] = useState<Tab[]>([]);
  function upsertTab(tab: Tab) {
    setTabs((tabs) => {
      let shouldInsert = true;
      const updatedTabs = [];
      for (const t of tabs) {
        if (t.id === tab.id) {
          updatedTabs.push(tab);
          shouldInsert = false;
        } else {
          updatedTabs.push(t);
        }
      }

      if (shouldInsert) {
        updatedTabs.push(tab);
      }
      return updatedTabs;
    });
  }
  function removeTab(tab: Tab) {
    setTabs((tabs) => tabs.filter((t) => t.id !== tab.id));
  }
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <TabbedContentContext.Provider
      value={{ tabs, upsertTab, removeTab, activeIdx }}
    >
      {children}
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
