import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Tools from './pages/Tools';
import HoudiniTools from './pages/tools/HoudiniTools';
import StandaloneTools from './pages/tools/StandaloneTools';
import ContactPage from './pages/ContactPage';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  color: #222;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/houdini" element={<HoudiniTools />} />
          <Route path="/tools/standalone" element={<StandaloneTools />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
