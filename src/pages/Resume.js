import React from 'react';
import styled from 'styled-components';
import PageHero from '../components/PageHero';
import Experience from '../components/Experience';
import Education from '../components/Education';

const Page = styled.main`
  padding-top: 80px; /* space for fixed header */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Resume = () => {
  return (
    <Page>
      <PageHero title="Resume" subtitle="Work experience and education" />
      <Container>
        {/* Reuse existing sections but now as a standalone page */}
        <div id="experience"><Experience /></div>
        <div id="education"><Education /></div>
      </Container>
    </Page>
  );
};

export default Resume;
