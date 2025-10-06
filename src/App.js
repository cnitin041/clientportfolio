import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PageBackground from './components/PageBackground';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Tools from './pages/Tools';
import HoudiniTools from './pages/tools/HoudiniTools';
import StandaloneTools from './pages/tools/StandaloneTools';
import ContactPage from './pages/ContactPage';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Filmography from './pages/Filmography';
import Showcase from './pages/Showcase';
import ShowcaseDetail from './pages/ShowcaseDetail';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent; /* allow global background to show through */
  color: #222;
`;

const Content = styled.div`
  flex: 1 0 auto; /* fill remaining height to push footer down */
`;

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Global parallax background behind all pages */}
      <PageBackground />
      <AppContainer>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/showcase/:slug" element={<ShowcaseDetail />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/houdini" element={<HoudiniTools />} />
            <Route path="/tools/standalone" element={<StandaloneTools />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/filmography" element={<Filmography />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
