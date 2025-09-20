import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';

const ShortcutSection = styled.section`
  padding: 4rem 2rem 5rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  padding: 1.5rem 1.25rem;
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

const Title = styled.h3`
  margin: 0 0 .5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
`;

const Desc = styled.p`
  margin: 0;
  color: #555;
`;

const Home = () => {
  return (
    <>
      {/* Intro only */}
      <Hero />

      {/* Sliding tech icons */}
      <TechMarquee title="Technologies I Work With" />

      {/* Minimal shortcuts */}
      <ShortcutSection>
        <Container>
          <Grid>
            <Card to="/resume">
              <Title>Resume</Title>
              <Desc>View work experience and education.</Desc>
            </Card>
            <Card to="/tools">
              <Title>Tools</Title>
              <Desc>Explore Houdini and Standalone tools.</Desc>
            </Card>
            <Card to="/contact">
              <Title>Get In Touch</Title>
              <Desc>Quick link to contact page.</Desc>
            </Card>
          </Grid>
        </Container>
      </ShortcutSection>
    </>
  );
};

export default Home;
