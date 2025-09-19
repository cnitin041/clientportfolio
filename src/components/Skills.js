import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsSection = styled.section`
  padding: 6rem 2rem 4rem;
`;

// Tiles grid instead of carousel
const TilesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1120px;
  margin: 0 auto 2rem;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #111;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

/* Removed carousel viewport/track/slide in favor of TilesGrid */

const SkillCard = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem 1rem;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 180px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transform: none;
  opacity: 1;

  &:hover {
    background: #ffffff;
    transform: scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.10);
    border-color: rgba(0, 0, 0, 0.10);
  }

  &:focus-within {
    transform: scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
  }
`;

const SkillImageWrap = styled(motion.div)`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const SkillImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  /* Monochrome with a subtle warm tint */
  filter: grayscale(100%) sepia(10%) saturate(60%) brightness(0.98) contrast(1.05) drop-shadow(0 4px 8px rgba(0,0,0,0.06));
  opacity: 0.9;
  transition: transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease;

  &:hover {
    filter: grayscale(0%) sepia(0%) saturate(110%) brightness(1) contrast(1);
    opacity: 1;
  }
`;

const SkillName = styled.h3`
  color: #222;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  color: #666;
`;

const TechLogosSection = styled(motion.div)`
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const TechTitle = styled.h3`
  color: #111;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const CarouselViewport = styled.div`
  overflow: hidden;
  position: relative;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 3rem;
  width: max-content;
  animation: ${marquee} 25s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const TechLogo = styled(motion.img)`
  width: 64px;
  height: 64px;
  object-fit: contain;
  opacity: 0.85;
  /* Monochrome by default for marquee logos */
  filter: grayscale(100%) sepia(8%) saturate(50%) brightness(0.98) contrast(1.05);
  transition: transform 0.3s ease, opacity 0.3s ease, filter 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
    filter: grayscale(0%) sepia(0%) saturate(110%) brightness(1) contrast(1);
  }
`;

/* Removed edge fades and dots */

const skills = [
  { name: 'React', level: 'Expert', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', level: 'Expert', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Python', level: 'Advanced', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Node.js', level: 'Advanced', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'TypeScript', level: 'Advanced', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'MongoDB', level: 'Intermediate', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker', level: 'Intermediate', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', level: 'Expert', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
];

const techLogos = [
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
  { name: 'Jenkins', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
  { name: 'Unreal', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg' },
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // no carousel: we keep a simple tiles layout, still use inView animations

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Technologies
        </SectionTitle>
        <TilesGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SkillImageWrap>
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                >
                  <SkillImage src={skill.img} alt={`${skill.name} logo`} loading="lazy" />
                </motion.div>
              </SkillImageWrap>
              <SkillName>{skill.name}</SkillName>
              <SkillLevel>{skill.level}</SkillLevel>
            </SkillCard>
          ))}
        </TilesGrid>

        <TechLogosSection
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <TechTitle>Technologies I Work With</TechTitle>
          <CarouselViewport>
            <CarouselTrack>
              {[...techLogos, ...techLogos].map((tech, index) => (
                <TechLogo
                  key={`${tech.name}-${index}`}
                  src={tech.img}
                  alt={`${tech.name} logo`}
                  loading="lazy"
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </CarouselTrack>
          </CarouselViewport>
        </TechLogosSection>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
