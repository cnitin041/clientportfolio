import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
// no section-wide particles; we'll add subtle per-card parallax
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const ExperienceSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  /* fade mask overlay to soften stack in/out */
  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 96px;
    pointer-events: none;
    z-index: 1;
  }
  &::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(247,247,247,1), rgba(247,247,247,0));
  }
  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(247,247,247,1), rgba(247,247,247,0));
  }
`;

const TimelineIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// removed BgLayer / BgBlob – parallax will live on the cards

const Container = styled.div`
  // max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #111;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

// Stacked card layout powered by ScrollStack

const JobTitle = styled.h3`
  color: #111;
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.35rem;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Company = styled.h4`
  color: #333;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 0.75rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const JobMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const JobDescription = styled.ul`
  color: #555;
  line-height: 1.6;
  list-style: none;
  padding: 0;
  font-size: 0.95rem;

  li {
    margin-bottom: 0.4rem;
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '▶';
      position: absolute;
      left: 0;
      color: rgb(61, 61, 61);
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    li { margin-bottom: 0.35rem; }
  }
`;

const experiences = [
  {
    title: "Pipeline TD",
    company: "DNEG",
    period: "Jan 2024 - Jul 2024",
    location: "Mumbai, India",
    description: [
      "Developed and maintained pipeline tools for VFX production workflows",
      "Collaborated with artists and supervisors to streamline production processes",
      "Implemented automated solutions to reduce manual tasks and improve efficiency",
      "Worked with Python, Maya API, and proprietary pipeline tools"
    ]
  },
  {
    title: "FX TD",
    company: "DNEG, REDEFINE",
    period: "Jul 2019 - Jul 2023",
    location: "Mumbai, India",
    description: [
      "Created complex visual effects for feature films and commercials",
      "Specialized in particle systems, fluid simulations, and procedural animations",
      "Collaborated with VFX supervisors to achieve creative vision",
      "Optimized render times and improved workflow efficiency"
    ]
  },
  {
    title: "FX Artist",
    company: "ASSISTANT ENTERTAINMENT",
    period: "Jul 2017 - Jul 2019",
    location: "Mumbai, India",
    description: [
      "Developed visual effects for various entertainment projects",
      "Created dynamic simulations and particle effects",
      "Worked closely with the creative team to deliver high-quality results",
      "Gained expertise in industry-standard VFX software and techniques"
    ]
  },
  {
    title: "Freelance Creative",
    company: "FREELANCE CREATIVE",
    period: "Jul 2016 - Jul 2017",
    location: "Remote",
    description: [
      "Provided creative services for various clients and projects",
      "Developed skills in project management and client communication",
      "Worked on diverse creative challenges and expanded technical expertise",
      "Built a strong foundation for career in visual effects industry"
    ]
  }
];

const Experience = () => {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const evenItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // ScrollStack provides the stacking/scroll effect; no manual useScroll needed here

  return (
    <ExperienceSection id="experience" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          Work Experience
        </SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ScrollStack
            className="experience-scrollstack"
            itemDistance={48}
            itemScale={0.02}
            itemStackDistance={22}
            stackPosition="22%"
            scaleEndPosition="12%"
            baseScale={0.9}
            blurAmount={0}
          >
            {experiences.map((exp, index) => (
              <ScrollStackItem key={index}>
                <motion.div variants={index % 2 === 0 ? itemVariants : evenItemVariants}>
                  <JobTitle>{exp.title}</JobTitle>
                  <Company>{exp.company}</Company>
                  <JobMeta>
                    <MetaItem><FaCalendarAlt /> {exp.period}</MetaItem>
                    <MetaItem><FaMapMarkerAlt /> {exp.location}</MetaItem>
                  </JobMeta>
                  <JobDescription>
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </JobDescription>
                </motion.div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </motion.div>
      </Container>
    </ExperienceSection>
  );
}
;

export default Experience;
