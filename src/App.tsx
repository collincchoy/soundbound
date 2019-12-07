import React from "react";
import "./App.css";
import { Section } from "react-bulma-components";
import { PersonalPage } from "./pages/Personal";
import { MusicPlayerProvider } from "./components/musicPlayer";

function App() {
  return (
    <div className="App">
      <MusicPlayerProvider>
        <Section id="content">
          <PersonalPage />
        </Section>
      </MusicPlayerProvider>
    </div>
  );
}

export default App;
