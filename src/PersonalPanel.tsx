import React from 'react';
import { Tabs, Panel } from 'react-bulma-components';
import { ArtistGallery } from './spots/artist';
import { TrackGallery } from './spots/track';

enum ViewType {
  TOP_ARTISTS = 'Top Artists',
  TOP_TRACKS = 'Top Tracks',
}

const activeStyle = { color: "#ffffff" };

export class PersonalPanel extends React.Component<{}, { currentView: ViewType }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentView: ViewType.TOP_ARTISTS,
    };
  }

  private handleTabChange(nextView: ViewType) {
    this.setState({
      currentView: nextView,
    });
  }

  private renderTabs() {
    const renderTab = (name: ViewType) => {
      return (
        <Tabs.Tab
          active={name === this.state.currentView}
          onClick={() => this.handleTabChange(name)}
        >{name}</Tabs.Tab>)
    };
    return (
      <Tabs className="header" align="centered" type="boxed" size="large">
        {renderTab(ViewType.TOP_ARTISTS)}
        {renderTab(ViewType.TOP_TRACKS)}
      </Tabs>);
  }

  private renderContent() {
    if (this.state.currentView === ViewType.TOP_TRACKS) {
      return <TrackGallery />;
    } else {
      return <ArtistGallery />;
    }
  }

  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    )
  }
}
