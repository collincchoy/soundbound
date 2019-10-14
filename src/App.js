import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ArtistGallery} from './spots/spot';
import {Profile} from './spots/profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Profile />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ArtistGallery />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn bread
        </a>
      </header>
    </div>
  );
}

export default App;
