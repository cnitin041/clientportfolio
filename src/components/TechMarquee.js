import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.section`
  padding: 2rem 2rem 3rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Viewport = styled.div`
  overflow: hidden;
`;

const Track = styled.div`
  display: flex;
  gap: 3rem;
  width: max-content;
  animation: ${marquee} 25s linear infinite;

  &:hover { animation-play-state: paused; }
`;

const Logo = styled(motion.img)`
  width: 64px;
  height: 64px;
  object-fit: contain;
  opacity: 0.85;
  filter: grayscale(100%) sepia(8%) saturate(50%) brightness(0.98) contrast(1.05);
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
    filter: grayscale(0%) sepia(0%) saturate(110%) brightness(1) contrast(1);
  }
`;

const tech = [
  { name: 'React', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Docker', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'MongoDB', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Git', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'HTML5', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
];

const TechMarquee = ({ title = 'Technologies' }) => {
  return (
    <Wrapper>
      <Container>
        <Title>{title}</Title>
        <Viewport>
          <Track>
            {[...tech, ...tech].map((t, i) => (
              <Logo key={`${t.name}-${i}`} src={t.img} alt={`${t.name} logo`} loading="lazy" whileHover={{ scale: 1.1 }} />
            ))}
          </Track>
        </Viewport>
      </Container>
    </Wrapper>
  );
};

export default TechMarquee;
