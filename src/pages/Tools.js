import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import AttolsLogo from '../assets/logos/attols.svg';
import HoudiniLogo from '../assets/logos/houdini.svg';

const Page = styled.main`
  padding: 0 2rem 4rem; /* PageHero already handles header offset */
`;

const Container = styled.div`
  max-width: 1400px;
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
  gap: 28px;
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 2.25rem 1.5rem;
  text-decoration: none;
  color: #111;
  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 18px 34px rgba(0,0,0,0.12);
  }
`;

const Thumb = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #f1f1f1;
  margin-bottom: 1rem;
  display: grid;
  place-items: center;
  overflow: hidden;
`;

const ThumbImg = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  display: block;
`;

const CardTitle = styled.h3`
  margin: 0 0 .25rem 0;
  font-size: 1.5rem;
  font-weight: 800;
  text-align: center;
`;

const CardDesc = styled.p`
  margin: 0;
  color: #555;
  text-align: center;
`;

const Tools = () => {
  return (
    <Page>
      {/* Increase top offset to account for header + tools submenu height */}
      <PageHero topOffset={176} title="Tools" subtitle="Explore Standalone and Houdini utilities" />
      <Container>
        <Grid>
          <Card to="/tools/standalone">
            <Thumb>
              <ThumbImg src={AttolsLogo} alt="Attols Standalone Logo" />
            </Thumb>
            <CardTitle>Standalone Tools</CardTitle>
            <CardDesc>Desktop utilities and helper apps.</CardDesc>
          </Card>
          <Card to="/tools/houdini">
            <Thumb>
              <ThumbImg src={HoudiniLogo} alt="Houdini Logo" />
            </Thumb>
            <CardTitle>Houdini Tools</CardTitle>
            <CardDesc>Custom nodes and workflow tools for Houdini.</CardDesc>
          </Card>
        </Grid>
      </Container>
    </Page>
  );
};

export default Tools;
