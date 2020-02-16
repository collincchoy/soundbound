import React, { useState } from "react";
import styles from "./index.module.css";
import { Tabs } from "react-bulma-components";
import TopArtistsPage from "./Artists";
import TopTracksPage from "./Tracks";

enum ViewType {
  TOP_ARTISTS = "Top Artists",
  TOP_TRACKS = "Top Tracks"
}

export default function TopPage() {
  const [currentView, setCurrentView] = useState(ViewType.TOP_ARTISTS);

  const handleTabChange = (nextView: ViewType) => {
    if (nextView !== currentView) {
      setCurrentView(nextView);
    }
  };

  const renderTab = (name: ViewType) => (
    <Tabs.Tab
      active={name === currentView}
      onClick={() => handleTabChange(name)}
    >
      {name}
    </Tabs.Tab>
  );

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <Tabs className="header" align="centered" type="boxed" size="large">
          {renderTab(ViewType.TOP_ARTISTS)}
          {renderTab(ViewType.TOP_TRACKS)}
        </Tabs>
        {currentView === ViewType.TOP_TRACKS ? (
          <TopTracksPage />
        ) : (
          <TopArtistsPage />
        )}
      </div>
    </div>
  );
}
