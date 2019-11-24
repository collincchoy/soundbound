import React from 'react';
import './App.css';
import { Section } from 'react-bulma-components';
import { Profile } from './components/profile';
import { PersonalPanel } from './components/PersonalPanel';
import MusicPlayer from './components/musicPlayer';
import { MusicPlayerProvider } from './components/musicPlayer/MusicPlayerContext';

function App() {
  return (
    <div className="App">
      <MusicPlayerProvider>
        <Section>
          <Profile />
          <PersonalPanel />
        </Section>
        <MusicPlayer />
      </MusicPlayerProvider>
    </div>
  );
}

export default App;
