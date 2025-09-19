import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCalendarAlt, FaMapMarkerAlt, FaLockOpen } from 'react-icons/fa';

const ExperienceSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
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

const Container = styled.div`
  max-width: 1000px;
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

// Vertical flow layout
const VerticalTimeline = styled.div`
  position: relative;
  padding-left: 110px;
  
  @media (max-width: 768px) {
    padding-left: 72px;
  }
  
  @media (max-width: 480px) {
    padding-left: 60px;
  }
`;

const VerticalLine = styled.div`
  position: absolute;
  left: 55px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #e0e0e0;
  
  @media (max-width: 768px) {
    left: 36px;
  }
  
  @media (max-width: 480px) {
    left: 28px;
    width: 2px;
  }
`;

const FlowItem = styled(motion.div)`
  position: relative;
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }
`;

const NodeCol = styled.div`
  width: 110px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 72px;
  }

  @media (max-width: 480px) {
    width: 56px;
  }
`;

const NodeBadge = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #e9e9e9;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  font-size: 1.4rem;
  margin-left: 20px; /* centers over vertical line */
  transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 16px 30px rgba(0,0,0,0.12);
    filter: none;
  }
  
  @media (max-width: 768px) {
    width: 52px;
    height: 52px;
    font-size: 1.1rem;
    margin-left: 8px;
  }

  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
    font-size: 0.95rem;
    margin-left: 6px;
  }
`;

const ConnectorV = styled.div`
  position: absolute;
  left: 55px;
  top: 64px;
  bottom: -20px;
  width: 3px;
  background: linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0));
  
  @media (max-width: 768px) {
    left: 36px;
    top: 52px;
  }

  @media (max-width: 480px) {
    left: 28px;
    top: 44px;
  }
`;

const NodeCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  min-width: 260px;
  background: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #ffffff;
    border-color: rgba(0,0,0,0.12);
    box-shadow: 0 14px 28px rgba(0,0,0,0.12);
  }
  
  @media (max-width: 900px) {
    min-width: 0;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.875rem 1rem;
  }
`;

const TimelineContent = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 45%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  transition: box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    transform: translateY(-50%);
  }

  ${props => props.$isEven ? `
    &::before {
      left: -30px;
      border-right-color: rgba(255, 255, 255, 0.1);
    }
  ` : `
    &::before {
      right: -30px;
      border-left-color: rgba(255, 255, 255, 0.1);
    }
  `}

  @media (max-width: 768px) {
    width: 100%;
    
    &::before {
      left: -30px;
      border-right-color: rgba(255, 255, 255, 0.1);
      border-left-color: transparent;
    }
  }

  &:hover {
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
  }
`;

const TimelineIcon = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    left: 30px;
    transform: translateX(-50%);
  }
`;

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
          <VerticalTimeline>
            <VerticalLine />
            {experiences.map((exp, index) => (
              <FlowItem key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NodeCol>
                  <NodeBadge title="Unlocked"><FaLockOpen /></NodeBadge>
                  {index < experiences.length - 1 && (<ConnectorV aria-hidden="true" />)}
                </NodeCol>

                <NodeCard>
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
                </NodeCard>
              </FlowItem>
            ))}
          </VerticalTimeline>
        </motion.div>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
