import React from 'react';
import './App.css';
import { Section } from 'react-bulma-components';
import { Profile } from './components/profile';
import { PersonalPanel } from './components/PersonalPanel';
import { MusicPlayerProvider } from './components/musicPlayer';

function App() {
  return (
    <div className="App">
      <MusicPlayerProvider>
        <Section>
          <Profile />
          <PersonalPanel />
        </Section>
      </MusicPlayerProvider>
    </div>
  );
}

export default App;
