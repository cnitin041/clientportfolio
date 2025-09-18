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
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

/* Removed carousel viewport/track/slide in favor of TilesGrid */

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 1.5rem 1.25rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 210px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.15);
  transform: none;
  opacity: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: scale(1.03);
    box-shadow: 0 22px 44px rgba(0, 0, 0, 0.25);
    border-color: rgba(255, 255, 255, 0.28);
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
  filter: drop-shadow(0 8px 14px rgba(0,0,0,0.25));
  transition: transform 0.25s ease;
`;

const SkillName = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const TechLogosSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.07);
  border-radius: 30px;
  padding: 2rem 2rem;
  text-align: center;
`;

const TechTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 2rem;
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
  opacity: 0.9;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
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
