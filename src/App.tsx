import React from "react";
import "./App.css";
import { Section } from "react-bulma-components";
import { PersonalPage } from "./pages/Personal";
import { MusicPlayerProvider } from "./components/musicPlayer";
import NavHeader from "./components/Nav";
import { LoginContextProvider } from "./hooks";

function App() {
  return (
    <div className="App">
      <LoginContextProvider>
        <NavHeader />
        <MusicPlayerProvider>
          <Section id="content">
            <PersonalPage />
          </Section>
        </MusicPlayerProvider>
      </LoginContextProvider>
    </div>
  );
}

export default App;
