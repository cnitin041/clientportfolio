import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import PageBackground from 'components/layout/PageBackground';
import Home from './pages/Home';
import Resume from 'features/resume/pages/Resume';
import Tools from 'features/tools/pages/Tools';
import HoudiniTools from 'features/tools/pages/HoudiniTools';
import HoudiniToolDetail from 'features/tools/pages/HoudiniToolDetail';
import StandaloneTools from 'features/tools/pages/StandaloneTools';
import StandaloneToolDetail from 'features/tools/pages/StandaloneToolDetail';
import ContactPage from 'features/contact/pages/ContactPage';
import Blogs from 'features/blogs/pages/Blogs';
import BlogDetail from 'features/blogs/pages/BlogDetail';
import Filmography from 'features/filmography/pages/Filmography';
import Showcase from 'features/showcase/pages/Showcase';
import ShowcaseDetail from 'features/showcase/pages/ShowcaseDetail';

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
    <BrowserRouter basename={process.env.PUBLIC_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
            <Route path="/tools/houdini/:slug" element={<HoudiniToolDetail />} />
            <Route path="/tools/standalone" element={<StandaloneTools />} />
            <Route path="/tools/standalone/:slug" element={<StandaloneToolDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/filmography" element={<Filmography />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
