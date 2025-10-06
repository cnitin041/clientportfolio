import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import PageHero from 'components/layout/PageHero';
import { films } from 'data/filmography';

const Page = styled.main`
  padding: 0 2rem 4rem;
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;

  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 800px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.div)`
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.06);
  overflow: hidden;
  cursor: pointer;
`;

const Poster = styled(motion.div)`
  height: 200px;
  background-size: cover;
  background-position: center;
  transition: transform .35s ease, filter .35s ease;
  filter: saturate(1.1) contrast(1.07) sepia(0.04);
`;

const Body = styled.div`
  padding: 12px 12px 14px;
`;

const Title = styled.h3`
  margin: 0 0 4px 0;
  font-size: 1.05rem;
`;

const Meta = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.95rem;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Chip = styled.span`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.85rem;
  color: #444;
  background: #fff;
`;

const Resp = styled.ul`
  margin: 10px 0 0 16px;
  color: #555;
  font-size: 0.9rem;
  line-height: 1.35;
`;

const FiltersWrap = styled.div`
  max-width: 1400px;
  margin: 0.5rem auto 1.25rem;
  display: grid;
  gap: 10px;
`;

const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const RowTitle = styled.span`
  font-size: 0.95rem;
  color: #666;
  margin-right: 6px;
`;

const FilterBtn = styled.button`
  appearance: none;
  border: 1px solid rgba(0,0,0,0.1);
  background: ${p => (p.$active ? '#111' : '#fff')};
  color: ${p => (p.$active ? '#fff' : '#222')};
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.95rem;
  cursor: pointer;
`;

// Modal
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Modal = styled(motion.div)`
  width: min(960px, 92vw);
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 24px 60px rgba(0,0,0,0.25);
  overflow: hidden;
`;

const ModalPoster = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
`;

const ModalBody = styled.div`
  padding: 16px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  appearance: none;
  background: #111;
  color: #fff;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  padding: 6px 10px;
`;

const ThumbStrip = styled.div`
  max-width: 1400px;
  margin: 1.5rem auto 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(180px, 1fr);
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const Thumb = styled.img`
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.08);
`;

// Cinematic overlays
const Vignette = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  box-shadow: inset 0 0 220px rgba(0,0,0,0.35);
`;

const Grain = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: .06;
  mix-blend-mode: multiply;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><g fill="%23000" fill-opacity="0.7"> <circle cx="5" cy="8" r="0.6"/><circle cx="22" cy="15" r="0.5"/><circle cx="40" cy="12" r="0.4"/><circle cx="12" cy="32" r="0.5"/><circle cx="34" cy="28" r="0.6"/><circle cx="50" cy="40" r="0.5"/><circle cx="28" cy="50" r="0.4"/><circle cx="8" cy="48" r="0.5"/></g></svg>');
  background-size: 60px 60px;
  animation: grainShift 8s steps(10) infinite;

  @keyframes grainShift {
    0% { transform: translate(0,0); }
    25% { transform: translate(-10px,6px); }
    50% { transform: translate(12px,-8px); }
    75% { transform: translate(-6px,10px); }
    100% { transform: translate(0,0); }
  }
`;

const LetterboxTop = styled.div`
  position: fixed; left: 0; right: 0; top: 0; height: 70px; background: rgba(0,0,0,0.9); z-index: 1100; pointer-events: none;
`;
const LetterboxBottom = styled.div`
  position: fixed; left: 0; right: 0; bottom: 0; height: 70px; background: rgba(0,0,0,0.9); z-index: 1100; pointer-events: none;
`;

const FilmCard = ({ film: f, index: i, onOpen }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true }}
      onClick={() => onOpen(f)}
    >
      <Poster style={{ backgroundImage: `url(${f.image})`, backgroundPosition: 'center' }} />
      <Body>
        <Title>{f.title}</Title>
        <Meta>{f.role} • {f.studio} • {f.year}</Meta>
        {Array.isArray(f.tags) && f.tags.length>0 && (
          <Chips>
            {f.tags.map((t, idx) => <Chip key={idx}>#{t}</Chip>)}
          </Chips>
        )}
        {Array.isArray(f.responsibilities) && f.responsibilities.length>0 && (
          <Resp>
            {f.responsibilities.slice(0,2).map((r, idx) => <li key={idx}>{r}</li>)}
          </Resp>
        )}
      </Body>
    </Card>
  );
};

const Filmography = () => {
  const [tag, setTag] = useState('All');
  const [year, setYear] = useState('All');
  const [active, setActive] = useState(null);

  const tags = useMemo(() => ['All', ...Array.from(new Set(films.flatMap(f => f.tags || [])))], []);
  const years = useMemo(() => ['All', ...Array.from(new Set(films.map(f => f.year))).sort((a,b)=>b-a)], []);
  const list = useMemo(() => films.filter(f => (tag==='All' || (f.tags||[]).includes(tag)) && (year==='All' || f.year===year)), [tag, year]);

  return (
    <Page>
      <Vignette aria-hidden />
      <Grain aria-hidden />
      <PageHero title="Filmography" subtitle="Selected film credits" />
      <FiltersWrap>
        <FiltersRow>
          <RowTitle>Tags:</RowTitle>
          {tags.map(t => (
            <FilterBtn key={t} $active={t===tag} onClick={()=>setTag(t)}>{t}</FilterBtn>
          ))}
        </FiltersRow>
        <FiltersRow>
          <RowTitle>Year:</RowTitle>
          {years.map(y => (
            <FilterBtn key={y} $active={y===year} onClick={()=>setYear(y)}>{y}</FilterBtn>
          ))}
        </FiltersRow>
      </FiltersWrap>
      <Container>
        <Grid>
          {list.map((f, i) => (
            <FilmCard key={f.id} film={f} index={i} onOpen={setActive} />
          ))}
        </Grid>
      </Container>
      {/* Bottom carousel removed as requested */}

      {active && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={()=>setActive(null)}>
          <LetterboxTop />
          <LetterboxBottom />
          <Modal initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e=>e.stopPropagation()}>
            <div style={{ position:'relative' }}>
              <ModalPoster src={active.image} alt={active.title} />
              <CloseBtn onClick={()=>setActive(null)}>Close</CloseBtn>
            </div>
            <ModalBody>
              <h2 style={{ margin: '0 0 6px 0' }}>{active.title}</h2>
              <p style={{ margin: 0, color: '#666' }}>{active.role} • {active.studio} • {active.year}{active.director?` • Dir. ${active.director}`:''}</p>
              {Array.isArray(active.tags) && active.tags.length>0 && (
                <Chips style={{ marginTop: 10 }}>
                  {active.tags.map((t, idx) => <Chip key={idx}>#{t}</Chip>)}
                </Chips>
              )}
              {Array.isArray(active.responsibilities) && active.responsibilities.length>0 && (
                <Resp style={{ marginTop: 12 }}>
                  {active.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}
                </Resp>
              )}
            </ModalBody>
          </Modal>
        </Overlay>
      )}
    </Page>
  );
};

export default Filmography;
