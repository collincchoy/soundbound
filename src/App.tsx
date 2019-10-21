import React from 'react';
import './App.css';
import { Section } from 'react-bulma-components';
import { Profile } from './spots/profile';
import { PersonalPanel } from './PersonalPanel';

function App() {
  return (
    <div className="App">
      <Section>
        <Profile />
      </Section>
      <Section>
        <PersonalPanel />
      </Section>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn bread
      </a>
    </div>
  );
}

export default App;
