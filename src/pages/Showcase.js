import React, { useMemo } from 'react';
import styled from 'styled-components';
import PageHero from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { loadAllShowcase } from '../utils/showcaseLoader';

const Page = styled.main`
  padding: 0 2rem 4rem; /* PageHero already handles header offset */
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin: 2.5rem 0 2rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.25rem;
  letter-spacing: 1px;
  margin: 1rem 0 0.25rem;
`;

const SectionSub = styled.p`
  text-align: center;
  color: #777;
  margin: 0 0 1.25rem;
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

const Card = styled(motion(Link))`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 8px 18px rgba(0,0,0,0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: inherit;
  text-decoration: none;

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

const Showcase = () => {
  const items = useMemo(() => loadAllShowcase(), []);
  const sections = [
    { key: 'Development', title: 'DEVELOPMENT', sub: 'Product Developments & Tools Development for Houdini' },
    { key: 'Showreel', title: 'SHOWREEL', sub: 'Some live action and CG film work' },
    { key: "Houdini RND's", title: "HOUDINI RND'S", sub: 'R&Ds done in free time.' }
  ];
  return (
    <Page>
      <PageHero title="Showcase" subtitle="Selected projects and highlights" />
      <Container>
        {sections.map((sec, sidx) => {
          const list = items.filter(i => i.category === sec.key);
          if (list.length === 0) return null;
          return (
            <Section key={sec.key}>
              <SectionTitle>{sec.title}</SectionTitle>
              {sec.sub && <SectionSub>{sec.sub}</SectionSub>}
              <Grid>
                {list.map((p, i) => (
                  <Card
                    key={p.slug}
                    to={`/showcase/${p.slug}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    aria-label={p.title}
                  >
                    <Thumb style={{ backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0)), url(${p.image})` }} />
                    <Title>{p.title}</Title>
                    {p.subtitle && <Desc>{p.subtitle}</Desc>}
                  </Card>
                ))}
              </Grid>
            </Section>
          );
        })}
      </Container>
    </Page>
  );
};

export default Showcase;
