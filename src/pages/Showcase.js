import React from 'react';
import styled from 'styled-components';
import PageHero from '../components/PageHero';
import { motion } from 'framer-motion';

const Page = styled.main`
  padding: 0 2rem 4rem; /* PageHero already handles header offset */
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 18px 34px rgba(0,0,0,0.12);
  }
`;

const Thumb = styled.div`
  height: 180px;
  border-radius: 12px;
  background: #f2f2f2;
  border: 1px solid rgba(0,0,0,0.06);
  background-size: cover;
  background-position: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.15rem;
`;

const Desc = styled.p`
  margin: 0;
  color: #555;
`;

const projects = [
  {
    title: 'Portfolio Redesign',
    desc: 'Clean, performant React-based portfolio UI with animations.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Houdini Toolkit',
    desc: 'A set of custom nodes and workflow tools for artists.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
  },
  {
    title: 'Standalone Utilities',
    desc: 'Desktop helpers for automation and productivity.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop'
  }
];

const Showcase = () => {
  return (
    <Page>
      <PageHero title="Showcase" subtitle="Selected projects and highlights" />
      <Container>
        <Grid>
          {projects.map((p, i) => (
            <Card key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Thumb style={{ backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0)), url(${p.image})` }} />
              <Title>{p.title}</Title>
              <Desc>{p.desc}</Desc>
            </Card>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Showcase;
