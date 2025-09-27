import React from 'react';
import styled from 'styled-components';
import PageHero from '../../components/PageHero';
import { Link } from 'react-router-dom';

const Page = styled.main`
  padding: 0 2rem 4rem; /* PageHero manages header offset */
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  color: #555;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Card = styled(Link)`
  display: block;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  text-decoration: none;
  color: inherit;
`;

const Thumb = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
`;

const CardBody = styled.div`
  padding: 12px 12px 14px;
`;

const Blurb = styled.p`
  margin: 6px 0 0 0;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ShareRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  a { border: 1px solid rgba(0,0,0,0.1); border-radius: 10px; padding: 6px 8px; display: inline-flex; }
  svg { width: 16px; height: 16px; }
`;

const HoudiniTools = () => {
  return (
    <Page>
      {/* Increase top offset to account for header + tools submenu height */}
      <PageHero topOffset={176} title="Houdini Tools" subtitle="Custom nodes and workflow utilities" />
      <Container>
        <Title>Highlights</Title>
        <Paragraph>Showcase of custom tools and utilities for Houdini. Click a card to learn more.</Paragraph>
        <Grid>
          <Card to="#">
            <Thumb src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" alt="Material Switcher" />
            <CardBody>
              <strong>Material Switcher</strong>
              <Blurb>Quickly toggle material setups for heavy vegetation scenes. Promote common settings, batch-apply variants, and preview changes non-destructively.</Blurb>
              <ShareRow>
                <a href="#" title="Share on LinkedIn" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.74-2.46C21.5 7.74 24 10 24 14.3V24h-5v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.21-3.26 4.49V24H8z"/></svg></a>
                <a href="#" title="Share on X" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.53 7.46L22 22h-6.62l-4.33-5.66L5.82 22H3l6.89-7.87L2 2h6.74l3.9 5.2L18.24 2zm-2.32 18h1.28L8.15 4H6.88l9.04 16z"/></svg></a>
              </ShareRow>
            </CardBody>
          </Card>

          <Card to="#">
            <Thumb src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop" alt="Resource Monitor" />
            <CardBody>
              <strong>Resource Monitor Tool</strong>
              <Blurb>Track and visualize performance during simulations. Lightweight profiling with CSV export and timeline overlays for quick diagnosis.</Blurb>
              <ShareRow>
                <a href="#" title="Share on LinkedIn" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.46 4.74-2.46C21.5 7.74 24 10 24 14.3V24h-5v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.21-3.26 4.49V24H8z"/></svg></a>
                <a href="#" title="Share on X" aria-label="X / Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.53 7.46L22 22h-6.62l-4.33-5.66L5.82 22H3l6.89-7.87L2 2h6.74l3.9 5.2L18.24 2zm-2.32 18h1.28L8.15 4H6.88l9.04 16z"/></svg></a>
              </ShareRow>
            </CardBody>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
};

export default HoudiniTools;
