import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  color: #222;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </AppContainer>
  );
}

export default App;
