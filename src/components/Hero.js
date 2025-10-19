import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import profileLocal from '../assets/profile/mehul.avif';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem clamp(12px, 1.5vw, 24px);
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 clamp(12px, 1.5vw, 24px); /* keep centered with page gutters */
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr); /* slight balance for visual center */
  gap: 4rem;
  align-items: center;
  justify-items: center; /* center columns' contents */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled(motion.div)`
  color: #222;
  text-align: center;
  max-width: 760px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 auto 1rem; /* center block */
  color: #111;
  max-width: 900px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: #444;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0 auto 2rem; /* center the paragraph block */
  color: #555;
  max-width: 640px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: #111;
  color: #fff;
  border: none;
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.1);
    background: #000;
  }
`;

// Motion-enabled Link with button appearance to avoid passing motion props to plain DOM nodes
const CTAButtonLink = styled(motion(Link))`
  background: #111;
  color: #fff;
  border: none;
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(0,0,0,0.1);
    background: #000;
  }
`;

const HeroImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const HeroImage = styled(motion.div)`
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: #ffffff;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const ProfileImage = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;

const FloatingElements = styled.div`
  display: block;
  position: absolute;
  inset: 0;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
`;

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // simple parallax: move decorative elements slightly on scroll
  const { scrollY } = useScroll();
  const ySlow = useTransform(scrollY, [0, 600], [0, -30]);
  const yMid = useTransform(scrollY, [0, 600], [0, -60]);
  const yFast = useTransform(scrollY, [0, 600], [0, -90]);

  // resolve profile image from assets with fallback (static import to avoid runtime warnings)
  const fallbackProfile = "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=60";
  const profileSrc = profileLocal || fallbackProfile;

  return (
    <HeroSection id="hero" ref={ref}>
      <FloatingElements>
        <FloatingElement
          size={60}
          style={{ top: '10%', left: '10%', y: ySlow }}
          animate={{ rotate: [0, 180, 360] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <FloatingElement
          size={40}
          style={{ top: '70%', right: '15%', y: yMid }}
          animate={{ x: [0, 10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <FloatingElement
          size={80}
          style={{ top: '30%', right: '5%', y: yFast }}
          animate={{ rotate: [0, -180, -360] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </FloatingElements>

      <HeroContainer>
        <HeroContent
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <HeroTitle variants={itemVariants}>
            MEHUL JOSHI
          </HeroTitle>
          <HeroSubtitle variants={itemVariants}>
            Full Stack Developer & Designer
          </HeroSubtitle>
          <HeroDescription variants={itemVariants}>
            Passionate about creating beautiful, functional, and user-centered digital experiences. 
            I specialize in modern web technologies and love bringing ideas to life through code.
          </HeroDescription>
          <motion.div variants={itemVariants}>
            <CTAButtonLink
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </CTAButtonLink>
          </motion.div>
        </HeroContent>

        <HeroImageContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <HeroImage
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ProfileImage
              src={profileSrc}
              alt="Profile"
              loading="lazy"
            />
          </HeroImage>
        </HeroImageContainer>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
