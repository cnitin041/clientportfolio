import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import Particles from '../Particles';

const Wrapper = styled.section`
  padding: ${props => (props.$offset ?? 120)}px 2rem 40px; /* offset for fixed header */
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 2.4rem;
  margin: 0 0 .5rem 0;
`;

const Subtitle = styled(motion.p)`
  color: #555;
  margin: 0;
`;

const BgBlob = styled(motion.div)`
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient( circle at 30% 30%, rgba(17,17,17,0.12), rgba(17,17,17,0) 60% );
  top: -120px;
  right: -120px;
  pointer-events: none;
`;

const PageHero = ({ title, subtitle, showParticles = true, topOffset = 120 }) => {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, 40]);
  const titleY = useTransform(scrollY, [0, 600], [0, 14]);
  const subY = useTransform(scrollY, [0, 600], [0, 20]);
  return (
    <Wrapper $offset={topOffset}>
      {showParticles && (
        <Particles density={50} speed={0.3} />
      )}
      <BgBlob
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ y: blobY }}
        transition={{ duration: 0.8 }}
      />
      <Container>
        <Title initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ y: titleY }}>
          {title}
        </Title>
        {subtitle && (
          <Subtitle initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} style={{ y: subY }}>
            {subtitle}
          </Subtitle>
        )}
      </Container>
    </Wrapper>
  );
};

export default PageHero;
