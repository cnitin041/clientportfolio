import React from 'react';
import styled from 'styled-components';
import PageHero from '../../components/PageHero';

const Page = styled.main`
  padding: 0 2rem 4rem; /* PageHero manages header offset */
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  color: #555;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px;
  padding: 1.25rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
`;

const StandaloneTools = () => {
  return (
    <Page>
      <PageHero title="Standalone Tools" subtitle="Desktop utilities and workflow helpers" />
      <Container>
        <Title>Highlights</Title>
        <Paragraph>Collection of desktop utilities. Replace these placeholders with real projects.</Paragraph>

        <Card>
          <strong>WazirX Tracker</strong>
          <Paragraph>A simple tracker utility with export features.</Paragraph>
        </Card>

        <Card>
          <strong>Batch Renamer</strong>
          <Paragraph>Rename files and assets with powerful patterns.</Paragraph>
        </Card>
      </Container>
    </Page>
  );
};

export default StandaloneTools;
