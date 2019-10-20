import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Section, Heading} from 'react-bulma-components';
import {ArtistGallery} from './spots/artist';
import {Profile} from './spots/profile';

function App() {
  return (
    <div className="App">
      <Section>
        <Profile />
      </Section>
      <Section>
        <Heading style={{color: "#ffffff"}}>Top Artists</Heading>
        <ArtistGallery />
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
