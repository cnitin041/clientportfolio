import React from 'react';
import styled from 'styled-components';
import Experience from '../components/Experience';
import Education from '../components/Education';

const Page = styled.main`
  padding-top: 80px; /* space for fixed header */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.25rem;
  margin: 2rem 0 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #555;
  margin-bottom: 2rem;
`;

const Resume = () => {
  return (
    <Page>
      <Container>
        <Title>Resume</Title>
        <Subtitle>Work experience and education</Subtitle>
        {/* Reuse existing sections but now as a standalone page */}
        <div id="experience"><Experience /></div>
        <div id="education"><Education /></div>
      </Container>
    </Page>
  );
};

export default Resume;
