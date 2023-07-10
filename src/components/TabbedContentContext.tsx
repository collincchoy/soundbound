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

type Action = { type: "addTab" } | { type: "removeTab" };
type Dispatch = (action: Action) => void;
type State = TabbedContentContextState;

type Tab = { id: string; header: ReactNode; content: ReactNode };

export type TabbedContentContextState = {
  tabs: Tab[];
  addTab: (tab: Tab) => void;
  upsertTab: (tab: Tab) => void;
  activeIdx?: number;
  // setActiveIdx: (idx: number) => void;
};

// function TabbedContentReducer(state: State, action: Action) {
//   switch (action.type) {
//     case "addTab": {
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
  function addTab(tab: Tab) {
    setTabs((tabs) => [...tabs, tab]);
  }
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
  const [activeIdx, setActiveIdx] = useState(0);
  return (
    <TabbedContentContext.Provider
      value={{ tabs, addTab, upsertTab, activeIdx }}
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
