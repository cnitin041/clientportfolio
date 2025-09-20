import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import AttolsLogo from '../assets/logos/attols.svg';
import HoudiniLogo from '../assets/logos/houdini.svg';

const ShortcutSection = styled(motion.section)`
  padding: 4rem 2rem 5rem;
`;

const ContentWrap = styled.div`
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// Single page background with subtle dots + two soft radial blobs in one layer
const PageBg = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background-color: #f5f5f5;
  /* Multiple backgrounds: two soft radial blobs + diagonal tint + subtle dot pattern */
  background-image:
    radial-gradient(640px 640px at 78% 12%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.11) 42%, rgba(0,0,0,0) 66%),
    radial-gradient(820px 820px at 88% 88%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.11) 42%, rgba(0,0,0,0) 66%),
    linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.00)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><circle cx="2" cy="2" r="1.2" fill="%23777777" fill-opacity="0.45"/></svg>');
  background-repeat: no-repeat, no-repeat, no-repeat, repeat;
  background-size: auto, auto, 100% 100%, 28px 28px;
  background-position: center 0px, center 320px, 0 0, 0px 0px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// Removed separate Banner section; we'll use backgrounds on existing sections.

// Added: extra sections to extend Home page length
const AboutSection = styled(motion.section)`
  padding: 3rem 2rem 1rem;
`;

const AboutWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
`;

const AboutTitle = styled.h2`
  margin: 0 0 0.75rem 0;
`;

const AboutText = styled.p`
  color: #555;
`;

const HighlightsSection = styled(motion.section)`
  padding: 2rem 2rem 3rem;
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightCard = styled(motion.div)`
  position: relative;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px;
  padding: 1.5rem 1.25rem;
  min-height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #111;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
`;

// Icon row
const IconRowSection = styled.section`
  padding: 1rem 2rem 2rem;
`;

const IconRowWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const IconCard = styled.div`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 12px;
  height: 96px;
  display: grid;
  place-items: center;
  box-shadow: 0 6px 14px rgba(0,0,0,0.05);
`;

const IconImg = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
`;

// Removed Gallery components; using card backgrounds instead.

const Card = styled(motion(Link))`
  display: block;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px;
  padding: 1.5rem 1.25rem;
  text-decoration: none;
  color: #111;
  box-shadow: 0 6px 16px rgba(0,0,0,0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 200px;
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
  text-align: left;
`;

const Desc = styled.p`
  margin: 0;
  color: #555;
  text-align: left;
`;

const Home = () => {
  const { scrollY } = useScroll();
  // page background parallax: animate container and layers at different speeds
  const pageBgY = useTransform(scrollY, [0, 1400], [0, -120]);
  const blob1Y = useTransform(scrollY, [0, 1400], [0, 140]);
  const blob2Y = useTransform(scrollY, [0, 1400], [0, 220]);
  const patternY = useTransform(scrollY, [0, 1400], [0, 320]);
  const bgPositions = useMotionTemplate`center ${blob1Y}px, center ${blob2Y}px, 0px ${patternY}px`;
  // Parallax background offsets for highlight cards
  const card1Y = useTransform(scrollY, [0, 800], [0, 80]);
  const card2Y = useTransform(scrollY, [0, 800], [0, 60]);
  const card3Y = useTransform(scrollY, [0, 800], [0, 100]);
  const card1Pos = useMotionTemplate`center ${card1Y}px`;
  const card2Pos = useMotionTemplate`center ${card2Y}px`;
  const card3Pos = useMotionTemplate`center ${card3Y}px`;

  // Parallax for shortcut cards
  const sc1Y = useTransform(scrollY, [0, 800], [0, 60]);
  const sc2Y = useTransform(scrollY, [0, 800], [0, 90]);
  const sc3Y = useTransform(scrollY, [0, 800], [0, 70]);
  const sc1Pos = useMotionTemplate`center ${sc1Y}px`;
  const sc2Pos = useMotionTemplate`center ${sc2Y}px`;
  const sc3Pos = useMotionTemplate`center ${sc3Y}px`;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Single page background with parallax */}
      <PageBg aria-hidden style={{ y: pageBgY, backgroundPosition: bgPositions }} />

      <ContentWrap>
      {/* Intro only */}
      <Hero />

      {/* Sliding tech icons */}
      <TechMarquee title="Technologies I Work With" />

      {/* Icon Row: featured tools/brands */}
      <IconRowSection>
        <IconRowWrap>
          <IconCard><IconImg src={HoudiniLogo} alt="Houdini" /></IconCard>
          <IconCard><IconImg src={AttolsLogo} alt="Attols" /></IconCard>
          <IconCard><IconImg src={HoudiniLogo} alt="Houdini" /></IconCard>
          <IconCard><IconImg src={AttolsLogo} alt="Attols" /></IconCard>
          <IconCard><IconImg src={HoudiniLogo} alt="Houdini" /></IconCard>
          <IconCard><IconImg src={AttolsLogo} alt="Attols" /></IconCard>
        </IconRowWrap>
      </IconRowSection>

      {/* About */}
      <AboutSection>
        <AboutWrap>
          <AboutTitle>About Me</AboutTitle>
          <AboutText>
            I design and build polished digital experiences. My background spans VFX, Houdini tools, and
            full‑stack web development, letting me combine technical depth with a strong design sense.
          </AboutText>
          <AboutText>
            I care about craft, performance, and maintainability. Below are a few highlights from recent work.
          </AboutText>
        </AboutWrap>
      </AboutSection>

      {/* Highlights */}
      <HighlightsSection>
        <HighlightsGrid>
          <HighlightCard
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop')",
              backgroundPosition: card1Pos
            }}
          >
            <strong>Pipeline Automation</strong>
            <p style={{ color: '#555' }}>Built internal tooling that reduced repetitive artist tasks by 30%.</p>
          </HighlightCard>
          <HighlightCard
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop')",
              backgroundPosition: card2Pos
            }}
          >
            <strong>Design Systems</strong>
            <p style={{ color: '#555' }}>Created reusable UI kits to keep products consistent and fast to ship.</p>
          </HighlightCard>
          <HighlightCard
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop')",
              backgroundPosition: card3Pos
            }}
          >
            <strong>Performance</strong>
            <p style={{ color: '#555' }}>Optimized apps with code‑splitting, lazy loading, and caching.</p>
          </HighlightCard>
        </HighlightsGrid>
      </HighlightsSection>

      {/* Shortcuts */}
      <ShortcutSection>
        <Container>
          <Grid>
            <Card
              to="/resume"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.96)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop')",
                backgroundPosition: sc1Pos
              }}
            >
              <Title>Resume</Title>
              <Desc>Work experience and education.</Desc>
            </Card>
            <Card
              to="/tools"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.96)), url('https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1200&auto=format&fit=crop')",
                backgroundPosition: sc2Pos
              }}
            >
              <Title>Tools</Title>
              <Desc>Houdini and Standalone utilities.</Desc>
            </Card>
            <Card
              to="/contact"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255,255,255,0.90), rgba(255,255,255,0.96)), url('https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop')",
                backgroundPosition: sc3Pos
              }}
            >
              <Title>Get In Touch</Title>
              <Desc>Say hello or start a project.</Desc>
            </Card>
          </Grid>
        </Container>
      </ShortcutSection>
      </ContentWrap>
    </div>
  );
};

export default Home;
