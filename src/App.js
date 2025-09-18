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
  background: radial-gradient(1200px 800px at 10% 10%, rgba(32, 35, 64, 0.9) 0%, rgba(20, 22, 39, 0.6) 60%, rgba(14, 16, 28, 0.8) 100%),
              linear-gradient(135deg, #1e1b4b 0%, #4c1d95 40%, #0f172a 100%);
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
