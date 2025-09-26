import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PageHero from '../components/PageHero';
import Experience from '../components/Experience';
import Education from '../components/Education';

const Page = styled.main`
  padding-top: 80px; /* space for fixed header */
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${p => p.$showToc ? '260px 1fr' : '1fr'};
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Toc = styled.nav`
  position: sticky;
  top: 90px; /* below header */
  align-self: start;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(6px) saturate(120%);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);

  @media (max-width: 900px) {
    display: none;
  }
`;

const TocTitle = styled.div`
  font-weight: 700;
  margin-bottom: 4px;
  font-size: 0.95rem;
  color: #444;
`;

const TocList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
`;

const TocItem = styled.li`
`;

const TocLink = styled.a`
  display: block;
  padding: 7px 9px;
  border-radius: 10px;
  color: ${p => p.$active ? '#111' : '#333'};
  background: ${p => p.$active ? 'rgba(17,17,17,0.08)' : 'transparent'};
  text-decoration: none;
  border: 1px solid rgba(0,0,0,0.06);
`;

const MobileToc = styled.div`
  display: none;
  margin-bottom: 10px;
  @media (max-width: 900px) {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const Chip = styled.a`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 999px;
  padding: 6px 10px;
  text-decoration: none;
  color: #222;
  font-size: 0.95rem;
`;

const Resume = () => {
  const [active, setActive] = useState(null);
  const [showToc, setShowToc] = useState(false);
  const expRef = useRef(null);
  const eduRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: 'experience', ref: expRef },
      { id: 'education', ref: eduRef },
    ];
    const obs = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length > 0) {
        const top = visibleEntries.sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        setActive(top.target.id);
      }
      // Do not toggle showToc here; it's controlled by scroll position only
    }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

    sections.forEach(s => s.ref.current && obs.observe(s.ref.current));

    const onScroll = () => {
      const exp = expRef.current?.getBoundingClientRect();
      const edu = eduRef.current?.getBoundingClientRect();
      // Only show TOC after the user has scrolled PAST the top of the first content section
      // i.e., when the top of Experience (or Education) crosses the top of the viewport
      const pastContentStart = (exp && exp.top <= 0) || (edu && edu.top <= 0);
      setShowToc(Boolean(pastContentStart));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Page>
      <PageHero title="Resume" subtitle="Work experience and education" />
      <Container $showToc={showToc}>
        {showToc && (
          <Toc aria-label="Resume sections">
            <TocTitle>On this page</TocTitle>
            <TocList>
              <TocItem>
                <TocLink href="#experience" $active={active==='experience'}>Experience</TocLink>
              </TocItem>
              <TocItem>
                <TocLink href="#education" $active={active==='education'}>Education</TocLink>
              </TocItem>
            </TocList>
          </Toc>
        )}

        <div>
          {showToc && (
            <MobileToc>
              <Chip href="#experience">Experience</Chip>
              <Chip href="#education">Education</Chip>
            </MobileToc>
          )}
          <section id="experience" ref={expRef}><Experience /></section>
          <section id="education" ref={eduRef}><Education /></section>
        </div>
      </Container>
    </Page>
  );
};

export default Resume;
