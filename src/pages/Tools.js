import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Page = styled.main`
  padding: 100px 2rem 4rem; /* space for header */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: block;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px;
  padding: 2rem 1.5rem;
  text-decoration: none;
  color: #111;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 14px 28px rgba(0,0,0,0.10);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 .5rem 0;
  font-size: 1.35rem;
  font-weight: 800;
`;

const CardDesc = styled.p`
  margin: 0;
  color: #555;
`;

const Tools = () => {
  return (
    <Page>
      <Container>
        <Title>Tools</Title>
        <Grid>
          <Card to="/tools/standalone">
            <CardTitle>Standalone Tools</CardTitle>
            <CardDesc>Desktop utilities and helper apps.</CardDesc>
          </Card>
          <Card to="/tools/houdini">
            <CardTitle>Houdini Tools</CardTitle>
            <CardDesc>Custom nodes and workflow tools for Houdini.</CardDesc>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
};

export default Tools;
