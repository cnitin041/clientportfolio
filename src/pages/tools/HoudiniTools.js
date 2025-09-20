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

const HoudiniTools = () => {
  return (
    <Page>
      <PageHero title="Houdini Tools" subtitle="Custom nodes and workflow utilities" />
      <Container>
        <Title>Highlights</Title>
        <Paragraph>Showcase of custom tools and utilities for Houdini. You can expand this with projects, screenshots and links.</Paragraph>

        <Card>
          <strong>Material Switcher</strong>
          <Paragraph>Quickly toggle material setups for heavy vegetation scenes.</Paragraph>
        </Card>

        <Card>
          <strong>Resource Monitor Tool</strong>
          <Paragraph>Track and visualize performance during simulations.</Paragraph>
        </Card>
      </Container>
    </Page>
  );
};

export default HoudiniTools;
